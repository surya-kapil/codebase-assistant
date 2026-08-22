import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App.jsx";
import "./common/i18n";
import queryClient from "./utils/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import initializeAxios from "./apis/client";
import { ToastContainer } from "react-toastify";
import Modal from "react-modal";

Modal.setAppElement("#root");

initializeAxios();

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <ToastContainer />
        <App />
      </QueryClientProvider>
    </BrowserRouter>
  </StrictMode>
);
