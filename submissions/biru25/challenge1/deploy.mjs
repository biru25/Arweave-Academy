#!/usr/bin/env node
/**
 * Deploy script for Challenge 1 (File-based Routing) to Arweave
 * using the @ardrive/turbo-sdk (free for files under 100 KiB).
 *
 * Usage:
 *   1. Export the JWK of your Arweave wallet to this folder as `key.json`
 *   2. npm install
 *   3. node deploy.mjs
 */
import fs from "node:fs";
import path from "node:path";
import mimeTypes from "mime-types";
import * as TurboSdk from "@ardrive/turbo-sdk";

const SITE_DIR = "site";
const KEY_FILE = "key.json";

if (!fs.existsSync(KEY_FILE)) {
    console.error(`[error] ${KEY_FILE} not found. Export your Arweave JWK here first.`);
    process.exit(1);
}
if (!fs.existsSync(SITE_DIR)) {
    console.error(`[error] ${SITE_DIR}/ folder not found. Run \`npm run build\` first.`);
    process.exit(1);
}

function walk(dir, all = []) {
    for (const entry of fs.readdirSync(dir)) {
        const p = path.join(dir, entry);
        if (fs.statSync(p).isDirectory()) walk(p, all);
        else all.push(p);
    }
    return all;
}

console.log(`\n[1/3] Uploading files from ./${SITE_DIR}/ ...`);
const turbo = TurboSdk.TurboFactory.authenticated({
    privateKey: JSON.parse(fs.readFileSync(KEY_FILE, "utf-8")),
});

const uploaded = [];
for (const filePath of walk(SITE_DIR)) {
    const contentType = mimeTypes.lookup(filePath) || "application/octet-stream";
    const result = await turbo.uploadFile({
        fileStreamFactory: () => fs.createReadStream(filePath),
        fileSizeFactory: () => fs.statSync(filePath).size,
        dataItemOpts: {
            tags: [{ name: "Content-Type", value: contentType }],
        },
    });
    const relPath = filePath
        .replaceAll(path.sep, "/")
        .replace(`${SITE_DIR}/`, "");
    console.log(`  + ${relPath}  ->  ${result.id}`);
    uploaded.push({ path: relPath, txId: result.id });
}

console.log(`\n[2/3] Building Arweave path manifest ...`);
const manifest = {
    manifest: "arweave/paths",
    version: "0.2.0",
    index: { path: "index.html" },
    paths: uploaded.reduce(
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
