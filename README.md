# TechVerse

A multi-page tech-store frontend built with **no framework and no build step for the app itself**: plain HTML, CSS and JavaScript modules, structured as **Web Components with Shadow DOM**.

**[Live demo](https://ahoura-coder.github.io/TechVerse/)** · 600 products · 6 categories · no backend

> This is a deliberate fundamentals project: before using React, I wanted to build the component model, state flow and rendering by hand. The full-stack projects are [FlowForge](https://github.com/Ahoura-CodeR/flowforge) and [Nexora](https://github.com/Ahoura-CodeR/nexora).

## What it does

- **Catalog** driven by `Data/products.json`: search, sorting (rating, price, name), filters generated from the data, pagination, empty and reset states.
- **Product details** chosen from the `?id=` URL parameter; the product's category selects the renderer (gallery, colors, storage options, specs, delivery, reviews). Gaming products reuse the same components via `specifications.device_type`.
- **Cart, login, register and profile** pages as frontend demos.

## How it is built

| Piece | Approach |
|---|---|
| Components | Custom Elements: `nav-bar`, `footer-site`, `category-component`, `product-data`, `product-category`, `products-detail` |
| Encapsulation | One Shadow Root per component, template cloned from a `<template>` element |
| State | Data is the source of truth: `products → filter/search/sort → pagination → render`. The DOM is never read back as state |
| Routing | Multi-page, with state in URL query parameters (`?category=`, `?id=`) |
| Styling | CSS variables in `css/variables.css`, shared base styles, per-component stylesheets inside each Shadow Root |

## Tests

The catalog logic (search, filters, sorting, pagination) lives in `js/lib/catalog.js` as pure functions and is covered by `tests/catalog.test.js`:

```bash
npm test
```

## Run locally

```bash
npm install
npm run dev
```

The pages use `<base href="/TechVerse/">`, so they are served from that path (the repository name on GitHub Pages). To run from the site root, remove or change the `<base>` tag.

## Known limitations

- **Auth is a UI demo.** There is no server, session or real account system.
- **Cart and reviews do not persist**; real persistence needs a backend.
- Each Shadow Root loads its stylesheets through `<link>`; sharing them with `adoptedStyleSheets` would avoid repeated requests.
- Product titles are generated from a brand list and a model list, so some pairs look odd (for example "Samsung iPhone 16 Pro"). The data is placeholder content.
- Product photos, avatars and the Inter font are loaded from external hosts, so the layout depends on them being reachable.

## Structure

```text
index.html, pages/      entry pages
Data/products.json      product dataset
css/                    global, variables, per-page styles
js/                     page entry scripts (home, products, detail, cart, ...)
js/lib/                 pure catalog logic and the shared products loader
js/component/           Web Components, one folder each (JS + CSS)
tests/                  unit tests (node --test)
assets/, public/        images and icons
```
