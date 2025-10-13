import React from "react";
import { createRoot } from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./index.css";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </QueryClientProvider>
  </React.StrictMode>
);

// if ('serviceWorker' in navigator) {
  // window.addEventListener('load', () => {
   // navigator.serviceWorker
     // .register('/sw.js')
      //.then((reg) => {
        //console.log('Service Worker registered:', reg);
      //})
      //.catch((err) => {
        //console.error('Service Worker registration failed:', err);
      //});
  //});
//}
