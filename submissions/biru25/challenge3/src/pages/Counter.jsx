import { useEffect, useState } from "react";

const STORAGE_KEY = "biru25.csr.counter";

export default function Counter() {
    const [count, setCount] = useState(() => {
        const saved = localStorage.getItem(STORAGE_KEY);
        return saved ? Number(saved) : 0;
    });

    useEffect(() => {
        localStorage.setItem(STORAGE_KEY, String(count));
    }, [count]);

    return (
        <>
            <section className="page-head">
                <span className="chip">Counter</span>
                <h1>Interactive state, in your browser</h1>
                <p className="lead">
                    The count is persisted to{" "}
                    <code>localStorage</code> so it survives reloads. Try
                    refreshing the page.
                </p>
            </section>

            <section className="counter-card">
                <div className="counter-num">{count}</div>
                <div className="counter-actions">
                    <button
                        className="btn btn-ghost"
                        onClick={() => setCount((c) => c - 1)}
                    >
                        -1
                    </button>
                    <button
                        className="btn btn-primary"
                        onClick={() => setCount((c) => c + 1)}
                    >
                        +1
                    </button>
                    <button
                        className="btn btn-ghost"
                        onClick={() => setCount(0)}
                    >
                        reset
                    </button>
                </div>
            </section>
        </>
    );
}
