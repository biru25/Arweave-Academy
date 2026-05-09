# Challenge 4: Hash-Based SPA Routing -- biru25

A **zero-framework** single-page app with a tiny hand-rolled hash router
(~30 lines), bundled with Vite and deployed permanently to Arweave via the
free Turbo SDK.

> AR.IO gateways can't run server-side code, so deep-linked SPAs normally
> break on refresh (`/#/about` works, `/about` 404s). Hash routing sidesteps
> this entirely -- the gateway always sees just the manifest root.

## Live Deployment

> After running `npm run deploy`, paste the final TX ID here.

- App: `https://arweave.net/<TX_ID>/`
- Todos: `https://arweave.net/<TX_ID>/#/todos`
- Dynamic user: `https://arweave.net/<TX_ID>/#/users/biru25`

## Features

- **~30-line custom router** with static paths, dynamic `:param` segments,
  and a `*` fallback route -- all in `src/router/index.js`
- **Todos page** with `localStorage` persistence
- **Dynamic user route** (`#/users/:name`) showing the router's param
  extraction
- **404 page** that echoes the unmatched path back
- `HashRouter`-style URLs so every deep link is refresh-safe
- `base: "./"` in Vite so asset URLs resolve under `arweave.net/<TX_ID>/`
- No React, no Vue, no Svelte -- just vanilla JS + Vite for bundling/dev
  server

---

## Project Structure

```
challenge4/
├── index.html               # Vite entry, single <div id="app">
├── package.json
├── vite.config.js           # base: "./", outDir: dist
├── deploy-website.mjs       # Turbo uploader + path manifest
├── challenge4.md            # Original challenge description
├── README.md
├── public/                  # Static assets copied into dist/
└── src/
    ├── main.js              # Entry: renders shell + starts the router
    ├── router/
    │   └── index.js         # 30-line hash-based router
    ├── pages/
    │   ├── home.js          # `/`
    │   ├── todos.js         # `/todos`  (interactive + localStorage)
    │   ├── user.js          # `/users/:name` (dynamic param)
    │   ├── about.js         # `/about`
    │   └── notfound.js      # `*` fallback
    └── styles/
        └── global.css       # Dark theme
```

---

## Run locally

```bash
cd submissions/biru25/challenge4
npm install
npm run dev            # http://localhost:5173
```

Production build / preview:

```bash
npm run build          # writes ./dist/
npm run preview        # preview the build at http://localhost:4173
```

---

## Deploy to Arweave

### Prerequisites

- Node.js 18+
- Your Arweave wallet JWK placed in this folder as `key.json` (git-ignored)

### Steps

```bash
npm install
npm run deploy         # clean + build + upload + path manifest
```

Expected output tail:

```
[3/3] Uploading manifest ...

Done! Deployed to Arweave.
  https://arweave.net/<MANIFEST_TX_ID>/
```

Open the URL. Try clicking around. Refresh at `#/todos` or
`#/users/biru25` -- every deep link should survive.

### Optional: ArNS

Register a friendly name at [arns.app](https://arns.app) and point it at
the manifest TX ID.

---

## Why hash routing (vs file-based or CSR with `BrowserRouter`)?

| Routing style                         | Refresh-safe on AR.IO? | Notes                               |
| ------------------------------------- | ---------------------- | ----------------------------------- |
| File-based (Challenge 1)              | Yes                    | Limited to pre-built pages          |
| SSG (Challenge 2)                     | Yes                    | Great for content, not interactive  |
| CSR + `BrowserRouter`                 | **No**                 | Needs a 404-fallback on the server  |
| CSR + `HashRouter` / hash router      | **Yes**                | What we do here and in Challenge 3  |

Hash routing is a direct, gateway-friendly fit for Arweave. No path-rewrite
tricks, no manifest hacks, just `#/whatever`.

---

## Notes

- `key.json` is git-ignored. **Never** commit your wallet.
- The whole built bundle is only a few dozen KiB -- well inside Turbo's
  free-upload tier (files under 100 KiB).
- If you want pretty URLs without hashes, either accept the refresh
  limitation, or ship an [ar-404-manifest workaround](https://docs.ar.io/).
  Hash routing stays the most predictable.
