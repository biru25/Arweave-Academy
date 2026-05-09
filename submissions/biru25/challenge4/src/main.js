import "./styles/global.css";
import { createRouter } from "./router/index.js";
import { homePage } from "./pages/home.js";
import { todosPage } from "./pages/todos.js";
import { userPage } from "./pages/user.js";
import { aboutPage } from "./pages/about.js";
import { notFoundPage } from "./pages/notfound.js";

const mountEl = document.getElementById("app");

// Render the persistent shell (header + footer) once, and reserve an inner
// container that each route replaces. Keeping the shell outside the router
// means nav links don't flicker on navigation.
mountEl.innerHTML = /* html */ `
    <div class="app">
        <header class="site-header">
            <a href="#/" class="brand" data-link>
                <span class="brand-mark">biru<span class="accent">25</span></span>
                <span class="brand-tag">hash SPA</span>
            </a>
            <nav class="nav">
                <a href="#/" data-link class="nav-link">Home</a>
                <a href="#/todos" data-link class="nav-link">Todos</a>
                <a href="#/users/biru25" data-link class="nav-link">User</a>
                <a href="#/about" data-link class="nav-link">About</a>
            </nav>
        </header>

        <main class="container" id="view"></main>

        <footer class="site-footer">
            <p>&copy; ${new Date().getFullYear()} biru25 -- stored permanently on Arweave.</p>
            <p class="small">Zero-framework hash-routed SPA. Arweave Academy Challenge 4.</p>
        </footer>
    </div>
`;

const router = createRouter([
    homePage,
    todosPage,
    userPage,
    aboutPage,
    notFoundPage,
]);

router.start(document.getElementById("view"));
