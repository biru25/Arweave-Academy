import { useState } from "react";

// A client-side Arweave TX metadata fetcher. Uses the arweave.net public
// GraphQL endpoint. Demonstrates real in-browser data fetching from the
// permaweb -- no backend needed.
const QUERY = `
query ($id: ID!) {
  transaction(id: $id) {
    id
    owner { address }
    fee { ar }
    block { timestamp height }
    tags { name value }
  }
}`;

export default function TxLookup() {
    const [txId, setTxId] = useState("");
    const [state, setState] = useState({
        loading: false,
        error: null,
        data: null,
    });

    async function onSubmit(e) {
        e.preventDefault();
        const id = txId.trim();
        if (!id) return;
        setState({ loading: true, error: null, data: null });
        try {
            const res = await fetch("https://arweave.net/graphql", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ query: QUERY, variables: { id } }),
            });
            const json = await res.json();
            if (json.errors?.length) throw new Error(json.errors[0].message);
            if (!json.data?.transaction)
                throw new Error("Transaction not found (yet)");
            setState({ loading: false, error: null, data: json.data.transaction });
        } catch (err) {
            setState({
                loading: false,
                error: err.message || "Unknown error",
                data: null,
            });
        }
    }

    return (
        <>
            <section className="page-head">
                <span className="chip">TX Lookup</span>
                <h1>Query Arweave from your browser</h1>
                <p className="lead">
                    Paste an Arweave transaction ID. The app calls
                    <code>https://arweave.net/graphql</code> directly from the
                    client -- no server in the middle.
                </p>
            </section>

            <form className="tx-form" onSubmit={onSubmit}>
                <input
                    className="tx-input"
                    placeholder="e.g. Xp9eyF9QwKVwuRTMxO65KmbWCnoSS6_jbx9GjD3bNTw"
                    value={txId}
                    onChange={(e) => setTxId(e.target.value)}
                />
                <button className="btn btn-primary" disabled={state.loading}>
                    {state.loading ? "Looking up..." : "Lookup"}
                </button>
            </form>

            {state.error && <p className="error">Error: {state.error}</p>}

            {state.data && (
                <section className="tx-result">
                    <h2>Transaction</h2>
                    <dl className="tx-meta">
                        <dt>ID</dt>
                        <dd className="mono">{state.data.id}</dd>
                        <dt>Owner</dt>
                        <dd className="mono">
                            {state.data.owner?.address ?? "-"}
                        </dd>
                        <dt>Fee (AR)</dt>
                        <dd>{state.data.fee?.ar ?? "-"}</dd>
                        <dt>Block height</dt>
                        <dd>{state.data.block?.height ?? "pending"}</dd>
                        <dt>Block time</dt>
                        <dd>
                            {state.data.block?.timestamp
                                ? new Date(
                                      state.data.block.timestamp * 1000
                                  ).toLocaleString()
                                : "pending"}
                        </dd>
                    </dl>

                    {state.data.tags?.length > 0 && (
                        <>
                            <h3>Tags</h3>
                            <ul className="tag-list">
                                {state.data.tags.map((t, i) => (
                                    <li key={i}>
                                        <span className="tag-name">
                                            {t.name}
                                        </span>
                                        <span className="tag-val">
                                            {t.value}
                                        </span>
                                    </li>
                                ))}
                            </ul>
                        </>
                    )}
                </section>
            )}
        </>
    );
}
