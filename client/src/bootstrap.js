import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import App from "./app";

import { store } from "./store";

import Start from "./features/start/Start";
import Directory from "./features/directory/Directory";
import Join from "./features/join/Join";

import "./style/main.scss";

function main() {
  ReactDOM.render(
    <Provider store={store}>
      <BrowserRouter>
        <App>
          <Switch>
            <Route path='/' exact component={Start} />
            <Route path='/directory' exact component={Directory} />
            <Route path='/join' exact component={Join} />
            <Route path='/lobby/:id' exact component={Join} />
          </Switch>
        </App>
      </BrowserRouter>
    </Provider>,
    document.querySelector(".app-wrapper")
  );
}

document.addEventListener("DOMContentLoaded", main);
