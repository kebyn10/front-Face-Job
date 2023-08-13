import React from "react";
import ReactDOM from "react-dom/client";
import { HashRouter } from "react-router-dom";
import App from "./App";
import ContextUserData from "./Hooks/userContext";


ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <HashRouter>
    <ContextUserData>
    <App />
    </ContextUserData>
        
    </HashRouter>
  </React.StrictMode>
)
