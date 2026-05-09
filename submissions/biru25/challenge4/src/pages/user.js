// Dynamic route demo. The router extracts `:name` from the path
// and passes it as a param, so we render different content per user.
export const userPage = {
    path: "/users/:name",
    render: ({ params }) => {
        const name = params.name;
        const bio = bios[name] || "(no bio found, but the route still works!)";
        return /* html */ `
            <section class="page-head">
                <span class="chip">Dynamic route</span>
                <h1>Hello, <span class="gradient">${escapeHtml(name)}</span></h1>
                <p class="lead">
                    The URL is <code>#/users/${escapeHtml(name)}</code>. Try
                    changing the name in the address bar.
                </p>
            </section>

            <section class="user-card">
                <h2>${escapeHtml(name)}</h2>
                <p>${escapeHtml(bio)}</p>
                <p>
                    <a href="#/users/ArweaveOasis" data-link>see @ArweaveOasis</a>
                    &nbsp;&middot;&nbsp;
                    <a href="#/users/biru25" data-link>see @biru25</a>
                </p>
            </section>
        `;
    },
};

const bios = {
    biru25:
        "Freelance Web3 node operator and dApp developer. Learning the Arweave & AO stack.",
    ArweaveOasis:
        "Community-led education for Arweave and AO. Organizer of the School of DumDum program.",
};

function escapeHtml(s) {
    return String(s).replace(
        /[&<>"']/g,
        (c) =>
            ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c])
    );
}
