export const homePage = {
    path: "/",
    render: () => /* html */ `
        <section class="hero">
            <span class="chip">Hash-Based SPA on Arweave</span>
            <h1>One HTML file. <span class="gradient">Infinite routes</span>.</h1>
            <p class="lead">
                This app is a single <code>index.html</code> plus a tiny JS
                bundle. All routing happens client-side via the URL fragment
                (the bit after <code>#</code>), which makes deep links survive
                a refresh on any AR.IO gateway.
            </p>
            <div class="cta-row">
                <a href="#/todos" data-link class="btn btn-primary">Try the todo list</a>
                <a href="#/users/biru25" data-link class="btn btn-ghost">
                    See a dynamic route
                </a>
            </div>
        </section>

        <section class="why">
            <h2>Why hash routing?</h2>
            <div class="why-grid">
                <div>
                    <h3>Refresh-safe</h3>
                    <p>
                        The server only ever sees the path before the <code>#</code>.
                        Refresh <code>#/about</code> or <code>#/users/42</code> and
                        the gateway still returns <code>index.html</code>.
                    </p>
                </div>
                <div>
                    <h3>Zero config</h3>
                    <p>
                        No 404 fallback, no rewrite rules, no base-path
                        gymnastics. Works on <em>any</em> static host.
                    </p>
                </div>
                <div>
                    <h3>Tiny runtime</h3>
                    <p>
                        Whole router fits in ~30 lines of JS. Great for small
                        permaweb apps where a framework is overkill.
                    </p>
                </div>
            </div>
        </section>
    `,
};
