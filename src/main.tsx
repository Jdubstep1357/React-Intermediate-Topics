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

-- staleTime specifies how long data is fresh
  -- Moment get a piece of data, treated as old. if old, refresh more data
  -- Use reactdevtools (flower icon) to look more into it

-- Garbage Collection
  -- inactive query removed from cache after a certain time

-- React Query automatically refreshes stale data under 3 situations:
  --1) When network is reconnected
  --2) When a component is mounted
  --3) When window is refocused

--  Query Object
  -- Object that contains all values from querying set of objects

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
