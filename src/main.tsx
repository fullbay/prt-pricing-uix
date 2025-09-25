import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { StrictMode } from "react";

import "./index.css";

import { createRoot } from "react-dom/client";
import { I18nextProvider } from "react-i18next";
import { BrowserRouter } from "react-router-dom";

import App from "./App.tsx";
import { ThemeProvider } from "./contexts/Theme/ThemeProvider.tsx";
import i18n from "./i18n.ts";

// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      retry: 1,
    },
  },
});

createRoot(document.getElementById("root")!).render(
  <QueryClientProvider client={queryClient}>
    <I18nextProvider i18n={i18n}>
      <StrictMode>
        <ThemeProvider>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </ThemeProvider>
      </StrictMode>
    </I18nextProvider>
  </QueryClientProvider>
);
