import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { NoteContextProvider } from "./context/notecontext.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <NoteContextProvider>
      <App />
    </NoteContextProvider>
  </StrictMode>,
);
