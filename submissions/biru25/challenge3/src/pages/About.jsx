export default function About() {
    return (
        <>
            <section className="page-head">
                <span className="chip">About</span>
                <h1>About this CSR demo</h1>
                <p className="lead">
                    A single-page React app shipped statically to Arweave.
                </p>
            </section>

            <section className="prose">
                <h2>How it works</h2>
                <ol>
                    <li>
                        Vite bundles React + React Router + pages into a tiny
                        <code>dist/</code> folder of static assets.
                    </li>
                    <li>
                        The <code>deploy-website.mjs</code> script uploads each
                        file with correct <code>Content-Type</code> tags via
                        the free Turbo SDK.
                    </li>
                    <li>
                        An Arweave path manifest is uploaded last; its TX ID
                        becomes the permanent URL of the entire app.
                    </li>
                    <li>
                        Routing happens client-side with
                        <code>HashRouter</code>, so every deep link works on
                        AR.IO gateways without server rewrites.
                    </li>
                </ol>

                <h2>Tech</h2>
                <ul>
                    <li>React 18</li>
                    <li>React Router 6 (HashRouter)</li>
                    <li>Vite 5</li>
                    <li>@ardrive/turbo-sdk (free uploads &lt; 100 KiB)</li>
                </ul>
            </section>
        </>
    );
}
