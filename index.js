import { jsx as _jsx } from "react/jsx-runtime";
import React from "react";
import ReactDOM from "react-dom/client";
import "./styles/index.css";
import App from "./components/App";
// Finds the root element and starts rendering React there.
const root = ReactDOM.createRoot(document.getElementById("root"));
// Render starting with the App components.
root.render(_jsx(React.StrictMode, { children: _jsx(App, {}) }));
