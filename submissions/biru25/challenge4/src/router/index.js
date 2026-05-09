// A tiny hash-based router. ~30 lines, no dependencies.
//
// Why hash routing? Because AR.IO gateways serve our `dist/` as plain static
// files. If a user refreshes at https://arweave.net/<TXID>/about/ the gateway
// asks for that sub-path and 404s (or returns the parent folder). By keeping
// the route in the URL fragment (e.g. `.../#/about`) the gateway always serves
// `index.html`, and our JS picks the route off the `#` part client-side.
//
// Pattern match is intentionally tiny: static `/foo` or `/foo/:id` segments.
export function createRouter(routes) {
    // Compile the route table once: /users/:id -> regex + key list
    const compiled = routes.map((r) => {
        const keys = [];
        const pattern = r.path
            .replace(/\/:([^/]+)/g, (_, key) => {
                keys.push(key);
                return "/([^/]+)";
            })
            .replace(/\//g, "\\/");
        return {
            ...r,
            regex: new RegExp(`^${pattern}$`),
            keys,
        };
    });

    const notFound = routes.find((r) => r.path === "*") ?? {
        render: () => `<h1>404</h1><p>Page not found.</p>`,
    };

    function currentPath() {
        // Drop the leading "#" then normalize trailing slashes.
        let hash = location.hash.slice(1) || "/";
        if (hash.length > 1 && hash.endsWith("/")) hash = hash.slice(0, -1);
        return hash;
    }

    function resolve(mountEl) {
        const path = currentPath();
        for (const r of compiled) {
            const m = r.regex.exec(path);
            if (!m) continue;
            const params = Object.fromEntries(
                r.keys.map((k, i) => [k, decodeURIComponent(m[i + 1])])
            );
            mountEl.innerHTML = r.render({ params, path });
            // Post-render hook for routes that need JS (event listeners etc.)
            r.mounted?.({ params, path, mountEl });
            updateActiveLinks(path);
            return;
        }
        mountEl.innerHTML = notFound.render({ params: {}, path });
        notFound.mounted?.({ mountEl, path });
    }

    function updateActiveLinks(path) {
        document.querySelectorAll("[data-link]").forEach((a) => {
            const href = a.getAttribute("href") || "";
            const target = href.startsWith("#") ? href.slice(1) : href;
            a.classList.toggle("active", target === path);
        });
    }

    return {
        start(mountEl) {
            window.addEventListener("hashchange", () => resolve(mountEl));
            if (!location.hash) location.hash = "#/";
            resolve(mountEl);
        },
    };
}
