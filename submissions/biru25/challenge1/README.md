# Challenge 1: File-based Routing -- biru25

A minimal, dependency-free multi-page website built with plain HTML and CSS,
demonstrating **file-based routing** for Arweave's permanent storage model.

> Because AR.IO gateways can't execute server-side code, file-based routing is
> the simplest and most reliable way to ship a static website on Arweave.

## Live Deployment

> After deploying via Dragondeploy, replace the placeholder below with your real
> Arweave transaction ID or ArNS name.

- Arweave URL: `https://arweave.net/<TX_ID>/`
- ArNS (optional): `https://<your-name>.ar.io`

---

## Project Structure

```
challenge1/
├── index.html         # Home page
├── about.html         # About page
├── projects.html      # Projects page
├── contact.html       # Contact page
├── challenge1.md      # Original challenge description
├── README.md          # This file
└── assets/
    └── style.css      # Shared dark theme stylesheet
```

Each page is a standalone HTML file. Navigation between pages is done with
standard `<a href="...">` tags -- that is file-based routing. No JavaScript
router, no build step, no server runtime required.

---

## Run Locally

You can just double-click `index.html`, or serve the folder with any static
server. Two options:

```bash
# Python 3
python3 -m http.server 8080

# Node (npx, no install)
npx serve .
```

Then open `http://localhost:8080/`.

---

## Deployment to Arweave

You can deploy with either a GUI (easy) or the included CLI script (one
command, repeatable).

### Option A -- Dragondeploy (no-code, easiest)

[Dragondeploy](https://dragondeploy.xyz) is the easiest no-code way to push
a static folder onto Arweave.

1. Open [https://dragondeploy.xyz](https://dragondeploy.xyz) and click
   **Connect Wallet** (ArConnect or arweave.app).
2. Drag-and-drop this `challenge1/` folder (excluding `node_modules/`,
   `site/`, `key.json`, `manifest.json`, `deployment-id`).
3. Approve the upload transaction in your wallet.
4. Copy the manifest TX ID shown after upload. Visit
   `https://arweave.net/<TX_ID>/`.

### Option B -- CLI with Turbo SDK (recommended, repeatable)

This folder ships with a small `deploy.mjs` script using the free
[`@ardrive/turbo-sdk`](https://www.npmjs.com/package/@ardrive/turbo-sdk)
(files under 100 KiB are free on Turbo).

**Prerequisites**

- [Node.js 18+](https://nodejs.org)
- An Arweave wallet JWK. In ArConnect: Settings -> Wallets -> Export Key ->
  save as `key.json` in this folder. (The file is git-ignored so you don't
  leak it.)

**Steps**

```bash
# from this challenge1/ folder
npm install            # installs turbo-sdk + mime-types
npm run deploy         # builds ./site/ and uploads to Arweave
```

You'll see output like:

```
[1/3] Uploading files from ./site/ ...
  + index.html     ->  <tx1>
  + about.html     ->  <tx2>
  + projects.html  ->  <tx3>
  + contact.html   ->  <tx4>
  + assets/style.css -> <tx5>

[2/3] Building Arweave path manifest ...
[3/3] Uploading manifest ...

Done! Deployed to Arweave.
  https://arweave.net/<MANIFEST_TX_ID>/
```

The final `MANIFEST_TX_ID` is saved to `./deployment-id`. Paste it into the
top of this README next to the "Live Deployment" section.

### Optional: Register an ArNS Name

To get a human-friendly URL like `biru25.ar.io` instead of the raw TX ID:

1. Go to [https://arns.app](https://arns.app).
2. Connect the same wallet.
3. Search for your desired name and purchase it with AR.
4. Point it to your manifest TX ID.

---

## Why File-based Routing?

| Advantage | Detail |
|-----------|--------|
| Zero dependencies | Nothing to bundle, nothing to break |
| Permanent | Each page is content-addressed on Arweave and cannot be tampered with |
| SEO-friendly | Every route is a real HTML document |
| Gateway-friendly | Works on any AR.IO gateway without extra config |
| Easy to maintain | Edit one `.html` file to change one page |

The trade-off: it is less ideal for highly dynamic apps or apps that share
lots of state between routes. For those use-cases, see Challenge 3 and 4
(Client-Side Rendering and Hash-Based SPA Routing).

---

## Notes

- All internal links use **relative paths** (e.g. `./about.html`) so the site
  works identically whether served from a local folder, an IPFS gateway, or
  an Arweave gateway under a TX ID path.
- Upload only content you own or have rights to publish. Arweave storage is
  permanent and public.
- Total payload is tiny (well under 100 KB), which keeps deployment cheap.
