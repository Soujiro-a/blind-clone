import React from "react";
import ReactDom from "react-dom";
import App from "./App";
import { createStore } from "redux";
import rootReducer from "./store";
import { Provider } from "react-redux";

const initialData = window.__INITIAL_DATA__;
const preloadedState = window.__PRELOADED_STATE__;
const devTool =
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__();
const store = createStore(rootReducer, preloadedState, devTool);
ReactDom.hydrate(
  <Provider store={store}>
    <App data={initialData} />
  </Provider>,
  document.getElementById("root")
);
