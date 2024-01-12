import "./index.css";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./app/store.js";

// check if the current route is an admin route
const pathname = window.location.pathname;
const isAdminRoute =
  pathname.startsWith("/admin") || pathname.startsWith("/seller");

ReactDOM.createRoot(document.getElementById("root")).render(
  // <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <App isAdminRoute={isAdminRoute} />
      </Provider>
    </BrowserRouter>
  // </React.StrictMode>
);
