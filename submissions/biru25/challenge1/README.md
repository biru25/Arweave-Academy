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

## Deployment to Arweave via Dragondeploy

[Dragondeploy](https://dragondeploy.xyz) is the easiest no-code way to push
a static folder onto Arweave permanently.

### Prerequisites

1. An Arweave wallet with some AR balance. Recommended:
   [ArConnect](https://www.arconnect.io/) browser extension or
   [arweave.app](https://arweave.app/).
2. The `challenge1/` folder from this submission on your computer.

### Steps

1. Open [https://dragondeploy.xyz](https://dragondeploy.xyz) in your browser.
2. Click **Connect Wallet** and connect your Arweave wallet.
3. Click **Select Folder** (or drag &amp; drop) and choose this
   `challenge1/` directory. Dragondeploy will list all files that will be
   uploaded -- `index.html`, `about.html`, `projects.html`, `contact.html`,
   `challenge1.md`, `README.md`, and everything under `assets/`.
4. Review the estimated upload cost in AR. Approve the transaction in your
   wallet when prompted.
5. Wait for the upload to finish. Dragondeploy will show a manifest
   transaction ID that points to your `index.html` as the default page.
6. Visit `https://arweave.net/<TX_ID>/` in your browser. You should see the
   home page; clicking the nav should navigate between the other pages.

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
