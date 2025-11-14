import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

// 1. Localiza o elemento <div id="root"> lá no index.html
const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

// 2. Renderiza a aplicação inteira dentro dele
root.render(
  // StrictMode é uma ferramenta de desenvolvimento que ajuda a achar erros comuns.
  // Ele faz os componentes renderizarem duas vezes em dev (por isso alguns console.log aparecem duplicados).
  <React.StrictMode>
    <App />
  </React.StrictMode>
);