export const notFoundPage = {
    path: "*",
    render: ({ path }) => /* html */ `
        <section class="page-head">
            <span class="chip">404</span>
            <h1>Route not found</h1>
            <p class="lead">
                No page is registered for <code>${escapeHtml(path)}</code>.
            </p>
            <p>
                <a href="#/" data-link class="btn btn-ghost">&larr; Back to home</a>
            </p>
        </section>
    `,
};

function escapeHtml(s) {
    return String(s).replace(
        /[&<>"']/g,
        (c) =>
            ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c])
    );
}
