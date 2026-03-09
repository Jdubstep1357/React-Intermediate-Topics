import "bootstrap/dist/css/bootstrap.css";
import React from "react";
import ReactDOM from "react-dom/client";
{
  /* QueryClient is how we cache data */
}
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import App from "./App";
import "./index.css";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const queryClient = new QueryClient();

/*
NOTES
- Caching
-- Process of storing data in a place where it can be accessed more quickly and efficiently in the future

*/

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
      {/* ReactQueryDevtools adds in flower for React Dev Toools */}
      <ReactQueryDevtools />
    </QueryClientProvider>
  </React.StrictMode>,
);
