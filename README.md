# Stoneroller Plugins

Squarespace plugins built by Stoneroller Cooperative (stonerollercoop.com).
This repository deploys to Cloudflare Pages. Everything in `public/` is served;
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
