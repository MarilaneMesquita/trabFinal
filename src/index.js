import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App"; // Certifique-se de que a importação do App está correta

const rootElement = document.getElementById("root");
const root = ReactDOM.createRoot(rootElement);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
