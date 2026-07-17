import React from "react";
import ReactDOM from "react-dom/client";
import App from "./Processingfee.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import routes from "./Router.jsx";
const route = createBrowserRouter(routes);
import "./global.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <RouterProvider router={route}></RouterProvider>,
);
