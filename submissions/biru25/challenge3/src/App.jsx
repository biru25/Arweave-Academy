import { NavLink, Outlet, Link } from "react-router-dom";

export default function App() {
    return (
        <div className="app">
            <header className="site-header">
                <Link to="/" className="brand">
                    <span className="brand-mark">
                        biru<span className="accent">25</span>
                    </span>
                    <span className="brand-tag">CSR demo</span>
                </Link>
                <nav className="nav">
                    <NavLink to="/" end className="nav-link">
                        Home
                    </NavLink>
                    <NavLink to="/counter" className="nav-link">
                        Counter
                    </NavLink>
                    <NavLink to="/tx" className="nav-link">
                        TX Lookup
                    </NavLink>
                    <NavLink to="/about" className="nav-link">
                        About
                    </NavLink>
                </nav>
            </header>

            <main className="container">
                <Outlet />
            </main>

            <footer className="site-footer">
                <p>
                    &copy; {new Date().getFullYear()} biru25 -- stored permanently
                    on Arweave.
                </p>
                <p className="small">
                    Built with React + Vite. Submitted for Arweave Academy
                    Challenge 3.
                </p>
            </footer>
        </div>
    );
}
