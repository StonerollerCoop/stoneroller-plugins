/**
 * Stoneroller Plugins Worker
 *
 * Serves everything in public/ (the plugin files and test page), and adds:
 *   POST /report    Problem reports sent by the plugin from client sites.
 *   GET  /check-now Runs the daily site check on demand and shows the results (no email).
 *   Daily schedule  Checks every client site in SITES and emails any problems.
 *
 * Email is sent only when the ALERT_EMAIL binding is configured in wrangler.jsonc
 * (see README). Without it, alerts are written to the Worker's logs.
 */
import { EmailMessage } from "cloudflare:email";

const MAX_BODY = 6000;

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);

    if (url.pathname === "/report") {
      if (request.method === "OPTIONS") return withCors(new Response(null, { status: 204 }));
      if (request.method !== "POST") return new Response("Method not allowed", { status: 405 });
      return withCors(await handleReport(request, env, ctx));
    }

    if (url.pathname === "/check-now") {
      const sites = siteList(env);
      const body = sites.length
        ? { checkedAt: new Date().toISOString(), sites: await checkAllSites(env) }
        : { checkedAt: new Date().toISOString(), message: "No client sites are listed yet. Add them to SITES in wrangler.jsonc." };
      return new Response(JSON.stringify(body, null, 2), {
        headers: { "content-type": "application/json; charset=utf-8", "cache-control": "no-store" }
      });
    }

    return env.ASSETS.fetch(request);
  },

  async scheduled(event, env, ctx) {
    ctx.waitUntil(dailyCheck(env));
  }
};

/* ---------------- Problem reports from the plugin ---------------- */

async function handleReport(request, env, ctx) {
  const text = (await request.text()).slice(0, MAX_BODY);
  let data;
  try { data = JSON.parse(text); } catch (e) { return new Response("Bad report", { status: 400 }); }

  const site = String(data.site || "").toLowerCase();
  if (!/^[a-z0-9.-]{1,253}$/.test(site)) return new Response("Bad site", { status: 400 });
  const report = {
    site,
    page: String(data.page || "/").slice(0, 200),
    version: String(data.version || "").slice(0, 20),
    hosted: !!data.hosted,
    issues: (Array.isArray(data.issues) ? data.issues : [])
      .slice(0, 10)
      .map((s) => String(s).slice(0, 300))
  };
  if (!report.issues.length) return new Response("No issues", { status: 400 });

  console.log("PLUGIN REPORT", JSON.stringify(report));

  // Only sites listed in SITES can trigger an email, so strangers cannot flood the inbox.
  const known = siteList(env).some((s) => hostOf(s.url) === site);
  if (!known) return new Response("Logged", { status: 202 });

  // Send each distinct problem from each site at most once a day.
  const day = new Date().toISOString().slice(0, 10);
  const fingerprint = await sha256(site + "|" + report.issues.join("|"));
  const cacheKey = new Request(`https://dedupe.stoneroller-plugins/${day}/${fingerprint}`);
  const cache = caches.default;
  if (await cache.match(cacheKey)) return new Response("Already reported today", { status: 202 });
  ctx.waitUntil(cache.put(cacheKey, new Response("1", { headers: { "cache-control": "max-age=86400" } })));

  const name = siteName(env, site);
  const lines = [
    `The secondary navigation plugin reported a problem on ${name}.`,
    "",
    `Site: ${site}`,
    `Page: ${report.page}`,
    `Plugin version: ${report.version} (${report.hosted ? "hosted" : "self-contained copy"})`,
    "",
    "What it found:",
    ...report.issues.map((i) => `  - ${i}`),
    "",
    "This report came from a visitor's browser. You will get at most one email a day for the same problem."
  ];
  ctx.waitUntil(sendAlert(env, `Nav plugin problem on ${name}`, lines.join("\n")));
  return new Response("Reported", { status: 202 });
}

/* ---------------- Daily site check ---------------- */

async function dailyCheck(env) {
  const results = await checkAllSites(env);
  const problems = results.filter((r) => r.issues.length);
  if (!problems.length) {
    console.log("DAILY CHECK OK", results.length, "sites");
    return;
  }
  const lines = ["The daily check found problems on these sites:", ""];
  for (const r of problems) {
    lines.push(`${r.name} (${r.url})`);
    r.issues.forEach((i) => lines.push(`  - ${i}`));
    lines.push("");
  }
  lines.push("To run this check again without email, open /check-now on the plugin address.");
  await sendAlert(env, `Nav plugin daily check: ${problems.length} site(s) need attention`, lines.join("\n"));
}

async function checkAllSites(env) {
  const sites = siteList(env);
  const results = [];
  for (const s of sites) results.push(await checkSite(s));
  return results;
}

async function checkSite(s) {
  const result = { name: s.name || hostOf(s.url), url: s.url, issues: [], notes: [] };
  let html;
  try {
    const res = await fetch(s.url, { headers: { "user-agent": "StonerollerPluginCheck/1.0" }, redirect: "follow" });
    if (!res.ok) {
      result.issues.push(`The site answered with status ${res.status}.`);
      return result;
    }
    html = await res.text();
  } catch (e) {
    result.issues.push("The site could not be reached.");
    return result;
  }

  if (!/id="header"/.test(html) && /password/i.test(html)) {
    result.notes.push("The site appears to be password protected, so only the outside of it could be checked.");
    return result;
  }

  const hostedLine = html.includes("/secondary-nav/v1/secondary-nav.js");
  const selfContained = html.includes("Stoneroller Secondary Navigation");
  if (!hostedLine && !selfContained) {
    result.issues.push("The plugin is no longer installed (neither the install line nor the self-contained copy was found).");
  } else {
    result.notes.push(hostedLine ? "Uses the hosted plugin." : "Uses the self-contained copy.");
  }
  if (!html.includes("data-sb-nav")) {
    result.issues.push("No navigation bar templates (data-sb-nav) were found in the page code.");
  }
  if (!/id="header"/.test(html)) {
    result.issues.push('Squarespace\'s header (id="header") was not found, so bars placed above or below the header cannot appear.');
  }

  // The plugin takes its colors from these Squarespace theme variables.
  const needed = ["--siteBackgroundColor", "--navigationLinkColor"];
  let css = html;
  const links = [...html.matchAll(/<link[^>]+href="([^"]*site\.css[^"]*)"/gi)].map((m) => m[1]);
  for (const href of links.slice(0, 3)) {
    try {
      const r = await fetch(new URL(href.replace(/&amp;/g, "&"), s.url).toString());
      if (r.ok) css += await r.text();
    } catch (e) {}
  }
  const missing = needed.filter((v) => !css.includes(v));
  if (missing.length) {
    result.issues.push(`Squarespace's theme color settings (${missing.join(", ")}) were not found, so bars may lose their theme colors.`);
  }
  return result;
}

/* ---------------- Helpers ---------------- */

function siteList(env) {
  let list = env.SITES;
  if (typeof list === "string") {
    try { list = JSON.parse(list); } catch (e) { list = []; }
  }
  return Array.isArray(list) ? list.filter((s) => s && s.url) : [];
}

function siteName(env, host) {
  const s = siteList(env).find((x) => hostOf(x.url) === host);
  return (s && s.name) || host;
}

function hostOf(u) {
  try { return new URL(u).hostname.toLowerCase(); } catch (e) { return ""; }
}

async function sha256(text) {
  const buf = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(text));
  return [...new Uint8Array(buf)].map((b) => b.toString(16).padStart(2, "0")).join("").slice(0, 32);
}

function withCors(res) {
  const r = new Response(res.body, res);
  r.headers.set("access-control-allow-origin", "*");
  r.headers.set("access-control-allow-methods", "POST, OPTIONS");
  r.headers.set("access-control-allow-headers", "content-type");
  return r;
}

async function sendAlert(env, subject, body) {
  console.log("ALERT", subject, "\n" + body);
  if (!env.ALERT_EMAIL || !env.ALERT_FROM || !env.ALERT_TO) return;
  const domain = String(env.ALERT_FROM).split("@")[1] || "localhost";
  const raw = [
    `From: Stoneroller Plugins <${env.ALERT_FROM}>`,
    `To: <${env.ALERT_TO}>`,
    `Subject: ${subject.replace(/[\r\n]+/g, " ")}`,
    `Message-ID: <${crypto.randomUUID()}@${domain}>`,
    `Date: ${new Date().toUTCString()}`,
    "MIME-Version: 1.0",
    "Content-Type: text/plain; charset=utf-8",
    "Content-Transfer-Encoding: 8bit",
    "",
    body
  ].join("\r\n");
  try {
    await env.ALERT_EMAIL.send(new EmailMessage(env.ALERT_FROM, env.ALERT_TO, raw));
  } catch (e) {
    console.log("EMAIL FAILED", String(e));
  }
}
