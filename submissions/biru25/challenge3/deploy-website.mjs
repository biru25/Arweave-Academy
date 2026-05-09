#!/usr/bin/env node
/**
 * Deploy Vite-built `dist/` SPA to Arweave using Turbo SDK.
 *
 * Usage:
 *   1. npm install
 *   2. Place your Arweave JWK in this folder as `key.json` (git-ignored)
 *   3. npm run deploy
 */
import fs from "node:fs";
import path from "node:path";
import mimeTypes from "mime-types";
import * as TurboSdk from "@ardrive/turbo-sdk";

const OUT_DIR = "dist";
const KEY_FILE = "key.json";

if (!fs.existsSync(KEY_FILE)) {
    console.error(`[error] ${KEY_FILE} not found.`);
    process.exit(1);
}
if (!fs.existsSync(OUT_DIR)) {
    console.error(`[error] ${OUT_DIR}/ not found. Run \`npm run build\` first.`);
    process.exit(1);
}

function walk(dir, acc = []) {
    for (const entry of fs.readdirSync(dir)) {
        const full = path.join(dir, entry);
        if (fs.statSync(full).isDirectory()) walk(full, acc);
        else acc.push(full);
    }
    return acc;
}

console.log(`\n[1/3] Uploading files from ./${OUT_DIR}/ ...`);
const turbo = TurboSdk.TurboFactory.authenticated({
    privateKey: JSON.parse(fs.readFileSync(KEY_FILE, "utf-8")),
});

const results = [];
for (const filePath of walk(OUT_DIR)) {
    const contentType = mimeTypes.lookup(filePath) || "application/octet-stream";
    const r = await turbo.uploadFile({
        fileStreamFactory: () => fs.createReadStream(filePath),
        fileSizeFactory: () => fs.statSync(filePath).size,
        dataItemOpts: {
            tags: [{ name: "Content-Type", value: contentType }],
        },
    });
    const rel = filePath.replaceAll(path.sep, "/").replace(`${OUT_DIR}/`, "");
    console.log(`  + ${rel}  ->  ${r.id}`);
    results.push({ path: rel, txId: r.id });
}

console.log(`\n[2/3] Building Arweave path manifest ...`);
const manifest = {
    manifest: "arweave/paths",
    version: "0.2.0",
    index: { path: "index.html" },
    paths: results.reduce(
        (acc, f) => ({ ...acc, [f.path]: { id: f.txId } }),
        {}
    ),
};
fs.writeFileSync("manifest.json", JSON.stringify(manifest, null, 2));

console.log(`[3/3] Uploading manifest ...`);
const manifestResult = await turbo.uploadFile({
    fileStreamFactory: () => fs.createReadStream("manifest.json"),
    fileSizeFactory: () => fs.statSync("manifest.json").size,
    dataItemOpts: {
        tags: [
            {
                name: "Content-Type",
                value: "application/x.arweave-manifest+json",
            },
        ],
    },
});

fs.writeFileSync("deployment-id", manifestResult.id + "\n");
console.log(`\nDone! Deployed to Arweave.`);
console.log(`  https://arweave.net/${manifestResult.id}/`);
console.log(`  https://arweave.developerdao.com/${manifestResult.id}/`);
console.log(`\nSaved TX id to ./deployment-id`);
