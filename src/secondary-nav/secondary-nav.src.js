/*!
 * Stoneroller Secondary Navigation for Squarespace 7.1
 * Version __VERSION__
 * Built by Stoneroller Cooperative (stonerollercoop.com) for Saint Barnabas Episcopal Church.
 *
 * Label icons: Font Awesome Free 6 by Fonticons, Inc. (fontawesome.com),
 * licensed CC BY 4.0. Social icons: Simple Icons (simpleicons.org), CC0.
 *
 * Each navigation is written as a <template data-sb-nav> element placed in
 * Code Injection or in a Code Block. This script reads those templates and
 * builds the navigation bars. See the installation guide for every option.
 */
(function () {
  "use strict";
  if (window.SBSecondaryNav) return;

  var VERSION = "__VERSION__";
  var ICONS = __ICONS__;
  var LABEL_ICONS = __LABEL_ICONS__;
  ICONS.email = "M2 4h20a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2zm0 2v.4l10 6.25L22 6.4V6H2zm20 2.75-9.47 5.92a1 1 0 0 1-1.06 0L2 8.75V18h20V8.75z";
  ICONS.phone = "M6.6 10.8a15.1 15.1 0 0 0 6.6 6.6l2.2-2.2a1 1 0 0 1 1-.25 11.4 11.4 0 0 0 3.6.57 1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.25.2 2.45.57 3.57a1 1 0 0 1-.25 1L6.6 10.8z";

  var LAYOUTS = ["links-right", "links-left", "links-center", "title-center"];
  var POSITIONS = ["above-header", "below-header", "section"];
  var MOBILE = ["hide", "show", "menu-top", "menu-bottom"];

  var CSS = __CSS__;

  var instances = [];
  var uid = 0;

  function injectStyles() {
    if (document.getElementById("sbnav-styles")) return;
    var style = document.createElement("style");
    style.id = "sbnav-styles";
    style.textContent = CSS;
    (document.head || document.documentElement).appendChild(style);
  }

  function pick(value, allowed, fallback) {
    return allowed.indexOf(value) > -1 ? value : fallback;
  }

  function readOptions(tpl) {
    var d = tpl.dataset;
    return {
      position: pick(d.position, POSITIONS, "above-header"),
      layout: pick(d.layout, LAYOUTS, "links-right"),
      theme: (d.theme || "").trim(),
      mobile: pick(d.mobile, MOBILE, "hide"),
      breakpoint: parseInt(d.breakpoint, 10) || 767,
      sticky: d.sticky === "true",
      label: d.label || "Secondary navigation"
    };
  }

  function makeSvg(viewBox, path, cls) {
    var ns = "http://www.w3.org/2000/svg";
    var svg = document.createElementNS(ns, "svg");
    svg.setAttribute("viewBox", viewBox);
    svg.setAttribute("aria-hidden", "true");
    svg.setAttribute("focusable", "false");
    if (cls) svg.setAttribute("class", cls);
    var p = document.createElementNS(ns, "path");
    p.setAttribute("d", path);
    svg.appendChild(p);
    return svg;
  }

  function makeIcon(name) {
    var path = ICONS[name];
    return path ? makeSvg("0 0 24 24", path) : null;
  }

  function makeLabelIcon(name) {
    var icon = LABEL_ICONS[(name || "").toLowerCase().trim()];
    return icon ? makeSvg(icon.v, icon.d, "sbnav__icon") : null;
  }

  function addLabelIcon(el, name) {
    var icon = makeLabelIcon(name);
    if (icon) {
      el.insertBefore(icon, el.firstChild);
      el.classList.add("sbnav__has-icon");
    }
  }

  function buildDropdown(source) {
    var id = "sbnav-dd-" + (++uid);
    var label = source.getAttribute("data-sb-dropdown") || "More";
    var wrap = document.createElement("div");
    wrap.className = "sbnav__dropdown";

    var toggle = document.createElement("button");
    toggle.type = "button";
    toggle.className = "sbnav__dropdown-toggle";
    toggle.setAttribute("aria-expanded", "false");
    toggle.setAttribute("aria-controls", id);
    toggle.innerHTML = '<span></span><svg viewBox="0 0 12 8" aria-hidden="true" focusable="false"><path d="M1 1l5 5 5-5" fill="none" stroke="currentColor" stroke-width="1.6"/></svg>';
    toggle.firstChild.textContent = label;
    if (source.hasAttribute("data-sb-icon")) addLabelIcon(toggle, source.getAttribute("data-sb-icon"));

    var panel = document.createElement("div");
    panel.className = "sbnav__dropdown-panel";
    panel.id = id;
    panel.hidden = true;
    Array.prototype.slice.call(source.querySelectorAll("a")).forEach(function (a) {
      panel.appendChild(a);
    });

    wrap.appendChild(toggle);
    wrap.appendChild(panel);

    var hoverOpenedAt = 0;
    function open() {
      panel.hidden = false;
      toggle.setAttribute("aria-expanded", "true");
      wrap.classList.add("is-open");
      panel.classList.remove("sbnav__dropdown-panel--right");
      var rect = panel.getBoundingClientRect();
      if (rect.right > document.documentElement.clientWidth - 8) {
        panel.classList.add("sbnav__dropdown-panel--right");
      }
    }
    function close() {
      panel.hidden = true;
      toggle.setAttribute("aria-expanded", "false");
      wrap.classList.remove("is-open");
    }

    toggle.addEventListener("click", function () {
      // A click right after hover opened the panel should keep it open.
      if (!panel.hidden && Date.now() - hoverOpenedAt < 500) return;
      if (panel.hidden) open(); else close();
    });
    wrap.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && !panel.hidden) {
        close();
        toggle.focus();
      }
    });
    wrap.addEventListener("focusout", function (e) {
      if (!wrap.contains(e.relatedTarget)) close();
    });
    document.addEventListener("click", function (e) {
      if (!wrap.contains(e.target)) close();
    });
    if (window.matchMedia && window.matchMedia("(hover: hover)").matches) {
      wrap.addEventListener("mouseenter", function () {
        if (panel.hidden) { open(); hoverOpenedAt = Date.now(); }
      });
      wrap.addEventListener("mouseleave", close);
    }
    return wrap;
  }

  function decorate(zone) {
    Array.prototype.slice.call(zone.querySelectorAll("[data-sb-dropdown]")).forEach(function (dd) {
      dd.parentNode.replaceChild(buildDropdown(dd), dd);
    });
    Array.prototype.slice.call(zone.querySelectorAll("a[data-sb-icon]")).forEach(function (a) {
      addLabelIcon(a, a.getAttribute("data-sb-icon"));
    });
    Array.prototype.slice.call(zone.querySelectorAll("a[data-sb-button]")).forEach(function (a) {
      a.classList.add("sbnav__button");
    });
    Array.prototype.slice.call(zone.querySelectorAll("a[data-sb-social]")).forEach(function (a) {
      var name = a.getAttribute("data-sb-social").toLowerCase();
      var icon = makeIcon(name);
      if (!icon) return;
      var text = (a.textContent || "").trim() || name;
      a.textContent = "";
      a.setAttribute("aria-label", text);
      a.classList.add("sbnav__social");
      a.appendChild(icon);
    });
    Array.prototype.slice.call(zone.querySelectorAll("a")).forEach(function (a) {
      if (a.getAttribute("target") === "_blank" && !a.rel) a.rel = "noopener";
      var href = a.getAttribute("href");
      if (href && href.charAt(0) !== "#" && a.host === location.host &&
          a.pathname.replace(/\/$/, "") === location.pathname.replace(/\/$/, "")) {
        a.setAttribute("aria-current", "page");
      }
    });
  }

  function build(tpl) {
    var opts = readOptions(tpl);
    var frag = tpl.content.cloneNode(true);

    var nav = document.createElement("nav");
    nav.className = "sbnav sbnav--" + opts.layout + " sbnav--pos-" + opts.position +
      " sbnav--mobile-" + opts.mobile;
    nav.setAttribute("aria-label", opts.label);
    if (opts.theme) {
      nav.setAttribute("data-section-theme", opts.theme);
      nav.classList.add(opts.theme);
    }

    var inner = document.createElement("div");
    inner.className = "sbnav__inner";

    [["data-sb-title", "sbnav__title"], ["data-sb-links", "sbnav__links"], ["data-sb-actions", "sbnav__actions"]]
      .forEach(function (zone) {
        var el = frag.querySelector("[" + zone[0] + "]");
        if (!el) return;
        el.classList.add(zone[1]);
        decorate(el);
        inner.appendChild(el);
      });

    nav.appendChild(inner);
    return { tpl: tpl, nav: nav, opts: opts, menuItems: null, section: null };
  }

  function getHeader() {
    return document.getElementById("header") || document.querySelector("header");
  }

  function mount(inst) {
    var header = getHeader();
    var pos = inst.opts.position;

    if (pos === "section" && inst.tpl.parentNode && inst.tpl.parentNode !== document.head &&
        document.body.contains(inst.tpl)) {
      inst.tpl.parentNode.insertBefore(inst.nav, inst.tpl);
      if (inst.opts.sticky) {
        inst.section = inst.nav.closest(".page-section") || inst.nav.parentNode;
        inst.section.classList.add("sbnav-sticky-section");
        updateStickyOffsets();
      }
    } else if (header) {
      if (pos === "below-header") header.appendChild(inst.nav);
      else header.insertBefore(inst.nav, header.firstChild);
    } else {
      return;
    }
    mountMobileMenu(inst);
    applyBreakpoint(inst);
  }

  function mountMobileMenu(inst) {
    var mode = inst.opts.mobile;
    if (mode !== "menu-top" && mode !== "menu-bottom") return;
    var root = document.querySelector('.header-menu-nav-folder[data-folder="root"] .header-menu-nav-folder-content') ||
               document.querySelector(".header-menu-nav-folder-content") ||
               document.querySelector(".header-menu-nav-list");
    if (!root) return;
    if (inst.menuItems && root.contains(inst.menuItems)) return;

    var box = document.createElement("div");
    box.className = "sbnav-menu-items sbnav-menu-items--" + mode;
    Array.prototype.slice.call(inst.nav.querySelectorAll("a")).forEach(function (a) {
      var item = document.createElement("div");
      item.className = "container header-menu-nav-item";
      var link = document.createElement("a");
      link.href = a.href;
      if (a.target) { link.target = a.target; link.rel = "noopener"; }
      var content = document.createElement("div");
      content.className = "header-menu-nav-item-content";
      content.textContent = a.getAttribute("aria-label") || a.textContent.trim();
      link.appendChild(content);
      item.appendChild(link);
      box.appendChild(item);
    });
    if (mode === "menu-top") root.insertBefore(box, root.firstChild);
    else root.appendChild(box);
    inst.menuItems = box;
  }

  function applyBreakpoint(inst) {
    var small = window.innerWidth <= inst.opts.breakpoint;
    inst.nav.classList.toggle("sbnav--is-mobile", small);
    if (inst.menuItems) inst.menuItems.hidden = !small;
  }

  function headerOffset() {
    var header = getHeader();
    if (!header) return 0;
    var cs = window.getComputedStyle(header);
    if (cs.position !== "fixed" && cs.position !== "sticky") return 0;
    var rect = header.getBoundingClientRect();
    return Math.max(0, Math.round(rect.bottom));
  }

  function updateStickyOffsets() {
    var top = headerOffset();
    instances.forEach(function (inst) {
      if (inst.section) inst.section.style.top = top + "px";
    });
  }

  var resizeQueued = false;
  function onResize() {
    if (resizeQueued) return;
    resizeQueued = true;
    window.requestAnimationFrame(function () {
      resizeQueued = false;
      instances.forEach(applyBreakpoint);
      updateStickyOffsets();
    });
  }

  function ensureMounted() {
    instances.forEach(function (inst) {
      if (!document.body.contains(inst.nav)) mount(inst);
      else mountMobileMenu(inst);
    });
  }

  function init() {
    injectStyles();
    var templates = document.querySelectorAll("template[data-sb-nav]");
    Array.prototype.slice.call(templates).forEach(function (tpl) {
      if (tpl.getAttribute("data-sb-built")) return;
      tpl.setAttribute("data-sb-built", "true");
      var inst = build(tpl);
      instances.push(inst);
      mount(inst);
    });
    if (!instances.length) return;

    window.addEventListener("resize", onResize);
    window.addEventListener("scroll", onResize, { passive: true });

    // Ask Squarespace to recalculate header height now that the bars are in place.
    window.dispatchEvent(new Event("resize"));

    // Squarespace sometimes redraws the header (for example in the editor).
    // Put the bars back if that happens.
    var timer = null;
    new MutationObserver(function () {
      clearTimeout(timer);
      timer = setTimeout(ensureMounted, 150);
    }).observe(document.body, { childList: true, subtree: true });
  }

  window.SBSecondaryNav = {
    version: VERSION,
    refresh: init,
    icons: Object.keys(LABEL_ICONS),
    renderIcon: function (name) { return makeLabelIcon(name) || makeIcon(name); },
    socialIcons: Object.keys(ICONS)
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
