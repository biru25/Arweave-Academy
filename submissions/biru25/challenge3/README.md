# Challenge 3: Client-Side Rendering -- biru25

A small interactive single-page app built with **React 18 + Vite + React
Router**, then deployed permanently to Arweave via the free Turbo SDK.

> AR.IO gateways cannot execute server-side code, so CSR is the go-to
> approach for highly interactive permaweb apps. Use it when you need
> real-time state, user input, and dynamic data fetching.

## Live Deployment

> After running `npm run deploy`, paste the final TX ID here.

- App: `https://arweave.net/<TX_ID>/`
- Counter: `https://arweave.net/<TX_ID>/#/counter`
- TX Lookup: `https://arweave.net/<TX_ID>/#/tx`

## Features

- React SPA with **4 client-rendered routes** (`/`, `/counter`, `/tx`, `/about`)
- Interactive counter using `useState` + `localStorage` persistence
- **Arweave TX metadata lookup** that calls `arweave.net/graphql` directly
  from the browser (real permaweb data fetching, no backend)
- `HashRouter` for reliable deep-link reloads on any AR.IO gateway
- `base: "./"` in Vite config so asset URLs work under the `<TX_ID>/` path
- Same dark-theme look used for Challenges 1 and 2 for a cohesive portfolio

---

## Project Structure

```
challenge3/
├── index.html                # Vite entry, single root <div id="root">
├── package.json
├── vite.config.js            # base: "./", outDir: dist
├── deploy-website.mjs        # Turbo uploader + manifest builder
├── challenge3.md             # Original challenge description
├── README.md                 # You are here
├── public/                   # Copied as-is into dist/ (empty by default)
└── src/
    ├── main.jsx              # React entrypoint, HashRouter wiring
    ├── App.jsx               # Shared shell (header + nav + footer)
    ├── pages/
    │   ├── Home.jsx
    │   ├── Counter.jsx       # useState + localStorage demo
    │   ├── TxLookup.jsx      # GraphQL fetch demo
    │   └── About.jsx
    └── styles/
        └── global.css
```

---

## Run locally

```bash
cd submissions/biru25/challenge3
npm install
npm run dev            # http://localhost:5173
```

Production build:

```bash
npm run build          # writes ./dist/ (static SPA ready to upload)
npm run preview        # preview the build at http://localhost:4173
```

---

## Deploy to Arweave

### Prerequisites

- Node.js 18+
- An Arweave wallet JWK exported as `key.json` in this folder (git-ignored)
- A tiny amount of AR, though Turbo gives you free uploads under 100 KiB

### Steps

```bash
npm install
npm run deploy         # clean + build + upload + create manifest
```

The script will:

1. Wipe `dist/` and rebuild the SPA with Vite.
2. Walk every file in `dist/` and upload to Arweave with correct MIME tags.
3. Build an
   [Arweave path manifest](https://docs.arweave.org/developers/arweave-node-server/advanced-topics/path-manifests)
   pointing `index.html` as the default.
4. Upload the manifest, write its TX ID to `./deployment-id`, and print
   the live URL.

Open `https://arweave.net/<MANIFEST_TX_ID>/`. Your SPA should load; refresh
any hash route (e.g. `/#/counter`) and it should still render.

### Optional: ArNS name

Get a human-friendly URL like `biru25.ar.io` by registering at
[arns.app](https://arns.app) and pointing it at the manifest TX ID.

---

## Why CSR on Arweave?

| Advantage               | Detail                                                 |
| ----------------------- | ------------------------------------------------------ |
| Rich interactivity      | Hooks, state, real-time updates in the browser        |
| No backend              | All logic runs client-side; gateway just serves bytes  |
| Cheap re-deploys        | Re-upload `dist/` to publish a new version            |
| Immutable snapshots     | Each deploy lives forever at its TX ID                |

Trade-offs:

- Slower first paint vs SSG (must download JS before render)
- Worse SEO if you rely on crawlers that don't execute JS
- Uses `HashRouter` rather than pretty paths (this is intentional -- see
  Challenge 4 for the detailed argument)

---

## Notes

- `key.json` is git-ignored. **Never** commit your wallet.
- `vite.config.js` sets `base: "./"` so the built assets resolve under
  `https://arweave.net/<TX_ID>/` without needing absolute paths.
