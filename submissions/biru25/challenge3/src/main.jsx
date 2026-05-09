import React from "react";
import ReactDOM from "react-dom/client";
import { HashRouter, Routes, Route } from "react-router-dom";
import App from "./App.jsx";
import Home from "./pages/Home.jsx";
import Counter from "./pages/Counter.jsx";
import TxLookup from "./pages/TxLookup.jsx";
import About from "./pages/About.jsx";
import "./styles/global.css";

// HashRouter is used instead of BrowserRouter because AR.IO gateways
// serve our `dist/` as plain static files -- they cannot do server-side
// rewrites, so only hash routes (`#/counter`) reliably survive a refresh.
ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <HashRouter>
            <Routes>
                <Route path="/" element={<App />}>
                    <Route index element={<Home />} />
                    <Route path="counter" element={<Counter />} />
                    <Route path="tx" element={<TxLookup />} />
                    <Route path="about" element={<About />} />
                </Route>
            </Routes>
        </HashRouter>
    </React.StrictMode>
);
