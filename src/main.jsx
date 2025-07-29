import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";

const link = document.createElement("link");
link.href =
  "https://fonts.googleapis.com/css2?family=Roboto:wght@400;500&display=swap";
link.rel = "stylesheet";
document.head.appendChild(link);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);
