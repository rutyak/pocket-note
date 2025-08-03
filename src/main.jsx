import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Welcome from "./components/Welcome/Welcome.jsx";
import Login from "./components/Auth/Login.jsx";
import Sidebar from "./components/Sidebar/Sidebar.jsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Register from "./components/Auth/Register.jsx";
import { GroupsProvider } from "./context/GroupContext.jsx";
import App from "./App.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Welcome />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/dashboard",
    element: <App />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <GroupsProvider>
      <ToastContainer position="top-right" autoClose={3000} />
      <RouterProvider router={router} />
    </GroupsProvider>
  </React.StrictMode>
);
