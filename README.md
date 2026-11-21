# Stoneroller Plugins

Squarespace plugins built by Stoneroller Cooperative (stonerollercoop.com).
This repository deploys to Cloudflare as a Worker (`wrangler.jsonc`, `src/worker.js`). Everything in `public/` is served;
everything in `src/` is source.

## Secondary Navigation (v1)

Served at `/secondary-nav/v1/secondary-nav.js`. Squarespace sites load it with:

    <script defer src="https://<pages-address>/secondary-nav/v1/secondary-nav.js"></script>

To change the plugin, edit `src/secondary-nav/secondary-nav.src.js` or
`secondary-nav.css`, then run:

    python3 src/secondary-nav/build.py

Commit and push; Cloudflare Pages redeploys, and sites pick up the change
within about five minutes (see `public/_headers`).

Changes within v1 must never alter how existing navigation templates are
written. A change that would break existing templates ships as v2 at a new path.

Label icons: Font Awesome Free 6 (CC BY 4.0). Social icons: Simple Icons (CC0).

## Alerts

The plugin and the Worker together give three kinds of warning.

1. **Problem reports.** About 2.5 seconds after a page loads, the plugin checks
   its own bars (placed, visible, theme colors found, phone menu found). If
   something is wrong it sends a short report to `/report`: the site's
   hostname, the page path, the plugin version and the problems found. No
   visitor information is sent. Each browser reports a given problem at most
   once a day, and the Worker emails each problem from each site at most once
   a day. Only sites listed in `SITES` can trigger an email.
2. **Daily check.** Every day at 12:17 UTC the Worker loads each site in
   `SITES` and checks that the plugin is installed, that bar templates are on
   the page, that Squarespace's header is present, and that Squarespace's
   theme color variables still exist. Open `/check-now` to run the same check
   at any time without sending email.
3. **Editor notices.** Logged-in Squarespace editors, or anyone who visits a
   page with `?sbnav-editor=on` once in their browser, see a notice when the
   page has a problem, when a self-contained copy is out of date, or when a
   new major version exists. `?sbnav-editor=off` turns notices off again.
   The notice reads `public/secondary-nav/latest.json`, which `build.py` writes.

### Adding a client site

Add it to `SITES` in `wrangler.jsonc`, for example
`[{ "name": "Saint Barnabas", "url": "https://www.example.org/" }]`, then commit
and push.

### Turning on email

Until this is done, alerts are written to the Worker's logs in the Cloudflare
dashboard (Workers & Pages > stoneroller-plugins > Logs).

1. In Cloudflare, open a domain you manage there and turn on **Email Routing**.
2. Add `libby@stonerollercoop.com` as a destination address and confirm it
   from the verification email.
3. In `wrangler.jsonc`, set `ALERT_FROM` to an address on that domain (for
   example `alerts@yourdomain`) and uncomment the `send_email` line.
4. Commit and push.
