import { Link } from "react-router-dom";

export default function Home() {
    return (
        <>
            <section className="hero">
                <span className="chip">Client-Side Rendering on Arweave</span>
                <h1>
                    A tiny <span className="gradient">React SPA</span>, served
                    from the permaweb.
                </h1>
                <p className="lead">
                    Everything you're seeing renders in your browser from a
                    single HTML file plus a JS bundle -- no server required.
                    Perfect for interactive apps that would be awkward to
                    pre-render.
                </p>
                <div className="cta-row">
                    <Link to="/counter" className="btn btn-primary">
                        Try the counter
                    </Link>
                    <Link to="/tx" className="btn btn-ghost">
                        Look up an Arweave TX
                    </Link>
                </div>
            </section>

            <section className="why">
                <h2>Why CSR?</h2>
                <div className="why-grid">
                    <div>
                        <h3>Rich interactivity</h3>
                        <p>
                            State, effects, and re-renders live in the browser.
                            Great for dashboards, wallets, and tools.
                        </p>
                    </div>
                    <div>
                        <h3>No server needed</h3>
                        <p>
                            AR.IO gateways can serve static `.js` and `.html`,
                            so the whole app runs client-side. No runtime
                            cost.
                        </p>
                    </div>
                    <div>
                        <h3>Works with hash routing</h3>
                        <p>
                            We use HashRouter so deep links like
                            `/#/counter` survive a refresh under any gateway.
                        </p>
                    </div>
                </div>
            </section>
        </>
    );
}
