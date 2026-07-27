import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App.jsx";
import "./common/i18n";
import queryClient from "./utils/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import initializeAxios from "./apis/client";

initializeAxios();

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
    </BrowserRouter>
  </StrictMode>
);
