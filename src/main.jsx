import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import BookProvider from "./context/BookContext";

ReactDOM.render(
  <BookProvider>
    <App />
  </BookProvider>,
  document.getElementById("root")
);
