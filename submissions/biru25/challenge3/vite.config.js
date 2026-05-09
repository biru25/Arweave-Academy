import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// IMPORTANT for Arweave deployments:
//   - `base: "./"` generates relative asset URLs so the built app works
//     under any path (e.g. https://arweave.net/<TX_ID>/).
//   - No code-splitting trade-offs: Vite's default chunking still works
//     because we use relative asset paths.
export default defineConfig({
    plugins: [react()],
    base: "./",
    build: {
        outDir: "dist",
        assetsDir: "assets",
        sourcemap: false,
    },
});
