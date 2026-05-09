export const aboutPage = {
    path: "/about",
    render: () => /* html */ `
        <section class="page-head">
            <span class="chip">About</span>
            <h1>About this app</h1>
            <p class="lead">
                Zero framework. Zero dependencies at runtime. ~30 lines of
                router.
            </p>
        </section>

        <section class="prose">
            <h2>How the router works</h2>
            <ol>
                <li>
                    On startup we read <code>location.hash</code> (defaulting to
                    <code>#/</code>).
                </li>
                <li>
                    Each declared route has its path compiled into a regex, with
                    <code>:param</code> becoming a capture group.
                </li>
                <li>
                    We match the current hash against every route, and call the
                    first one that matches, passing the extracted params.
                </li>
                <li>
                    The rendered HTML replaces <code>#app</code>. If a route has
                    a <code>mounted()</code> hook, we run it to wire up event
                    listeners.
                </li>
                <li>
                    A <code>hashchange</code> listener triggers re-resolution
                    whenever the user clicks a hash link or edits the URL.
                </li>
            </ol>

            <h2>Why this fits Arweave</h2>
            <p>
                Static hosts (AR.IO gateways included) don't know about our
                client-side routes. If you ask them for <code>/about/</code>
                they'll 404, because only <code>index.html</code> was uploaded.
                Hash routing sidesteps that: the path the gateway sees is
                always just the manifest's root.
            </p>

            <h2>Trade-offs</h2>
            <ul>
                <li>URLs contain a <code>#</code> (some people find this ugly).</li>
                <li>Search engines may index them poorly -- not ideal for SEO.</li>
                <li>But: zero config, zero fallback, always refresh-safe.</li>
            </ul>
        </section>
    `,
};
