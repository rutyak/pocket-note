import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { GroupsProvider } from "./context/GroupContext.jsx";
import App from "./App.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <GroupsProvider>
      <ToastContainer position="top-right" autoClose={3000} />
      <App />
    </GroupsProvider>
  </React.StrictMode>
);
