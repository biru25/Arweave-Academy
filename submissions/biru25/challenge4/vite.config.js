import { defineConfig } from "vite";

// `base: "./"` is critical: it makes Vite emit relative asset URLs so the
// built app works under any path, including `https://arweave.net/<TX_ID>/`.
export default defineConfig({
    base: "./",
    build: {
        outDir: "dist",
        assetsDir: "assets",
        sourcemap: false,
    },
});
