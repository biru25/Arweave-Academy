// Interactive demo: persists a todo list in localStorage so reloads keep
// the state. Shows that a hash-routed SPA can still hold real client state.

const KEY = "biru25.ch4.todos";

function load() {
    try {
        return JSON.parse(localStorage.getItem(KEY) || "[]");
    } catch {
        return [];
    }
}
function save(items) {
    localStorage.setItem(KEY, JSON.stringify(items));
}
function escapeHtml(s) {
    return s.replace(
        /[&<>"']/g,
        (c) =>
            ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c])
    );
}

function renderList(items) {
    if (items.length === 0) {
        return `<li class="todo-empty">Nothing yet. Add something above.</li>`;
    }
    return items
        .map(
            (item) => /* html */ `
                <li class="todo-item ${item.done ? "done" : ""}">
                    <label>
                        <input type="checkbox" data-toggle="${item.id}" ${item.done ? "checked" : ""} />
                        <span>${escapeHtml(item.text)}</span>
                    </label>
                    <button class="todo-del" data-del="${item.id}" aria-label="delete">x</button>
                </li>
            `
        )
        .join("");
}

export const todosPage = {
    path: "/todos",
    render: () => /* html */ `
        <section class="page-head">
            <span class="chip">Todos</span>
            <h1>Client-side state that persists</h1>
            <p class="lead">
                State lives in <code>localStorage</code>. Refresh, close the
                tab, come back -- your list is still here.
            </p>
        </section>

        <form id="todo-form" class="tx-form">
            <input id="todo-input" class="tx-input" placeholder="Add a new todo..." autocomplete="off" />
            <button class="btn btn-primary">Add</button>
        </form>

        <ul id="todo-list" class="todo-list"></ul>
    `,
    mounted({ mountEl }) {
        let items = load();

        const listEl = mountEl.querySelector("#todo-list");
        const formEl = mountEl.querySelector("#todo-form");
        const inputEl = mountEl.querySelector("#todo-input");

        function paint() {
            listEl.innerHTML = renderList(items);
        }

        formEl.addEventListener("submit", (e) => {
            e.preventDefault();
            const text = inputEl.value.trim();
            if (!text) return;
            items = [...items, { id: crypto.randomUUID(), text, done: false }];
            save(items);
            inputEl.value = "";
            paint();
        });

        listEl.addEventListener("click", (e) => {
            const del = e.target.closest("[data-del]");
            if (del) {
                items = items.filter((i) => i.id !== del.dataset.del);
                save(items);
                paint();
            }
        });
        listEl.addEventListener("change", (e) => {
            const toggle = e.target.closest("[data-toggle]");
            if (toggle) {
                items = items.map((i) =>
                    i.id === toggle.dataset.toggle ? { ...i, done: toggle.checked } : i
                );
                save(items);
                paint();
            }
        });

        paint();
    },
};
