import express from "express";
import fs from "fs";
import path from "path";
import { renderToString } from "react-dom/server";
import React from "react";
import App from "./App";
import { ServerStyleSheet } from "styled-components";
import url from "url";
import { createStore } from "redux";
import rootReducer from "./store";
import { Provider } from "react-redux";

const app = express();
const html = fs.readFileSync(
  path.resolve(__dirname, "../dist/index.html"),
  "utf8"
);
app.use("/dist", express.static("dist"));
app.get("/favicon.ico", (req, res) => res.sendStatus(204));
app.get("*", async (req, res) => {
  const store = createStore(rootReducer);
  const parsedUrl = url.parse(req.url, true);
  const page = parsedUrl.pathname ? parsedUrl.pathname.substr(1) : "home";
  const sheet = new ServerStyleSheet();

  try {
    const renderString = renderToString(
      sheet.collectStyles(
        <Provider store={store}>
          <App data={page} />
        </Provider>
      )
    );

    const initialData = { page };
    const preloadedState = JSON.stringify(store.getState());
    const styles = sheet.getStyleTags();
    const result = html
      .replace('<div id="root"></div>', `<div id="root">${renderString}</div>`)
      .replace("__DATA_FROM_SERVER__", JSON.stringify(initialData))
      .replace("__STYLE_FROM_SERVER__", styles)
      .replace("__REDUX_STATE_FROM_SERVER__", preloadedState);
    res.send(result);
  } catch (err) {
    console.log(err);
  } finally {
    sheet.seal();
  }
});
app.listen(3000);
