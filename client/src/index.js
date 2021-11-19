import React from "react";
import ReactDom from "react-dom";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import PreloadContext from "./lib/PreloadContext";

const initialData = window.__INITIAL_DATA__;
ReactDom.hydrate(
  <BrowserRouter>
    <PreloadContext.Provider value={initialData}>
      <App />
    </PreloadContext.Provider>
  </BrowserRouter>,
  document.getElementById("root")
);
