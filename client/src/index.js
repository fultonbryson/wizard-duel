import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./app";

import { store } from "./store";

import Start from "./features/start/Start";
import Directory from "./features/directory/Directory";
import Join from "./features/join/Join";
import Host from "./features/host/Host";
import Lobby from "./features/lobby/Lobby";
import Match from "./features/match/Match";

import "./style/main.scss";

function main() {
  ReactDOM.render(
    <Provider store={store}>
      <BrowserRouter>
        <App>
          <Routes>
            <Route path='/' element={<Start />} />
            <Route path='/directory' element={<Directory />} />
            <Route path='/join' element={<Join />} />
            <Route path='/host' element={<Host />} />
            <Route path='/lobby/:id' element={<Lobby />} />
            <Route path='/match/:id' element={<Match />} />
          </Routes>
        </App>
      </BrowserRouter>
    </Provider>,
    document.querySelector(".app-wrapper")
  );
}

document.addEventListener("DOMContentLoaded", main);
