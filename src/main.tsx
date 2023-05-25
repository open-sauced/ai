import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./popup.css";
import { Router } from "react-chrome-extension-router";

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <Router>
            <App />
        </Router>
    </React.StrictMode>,
);
