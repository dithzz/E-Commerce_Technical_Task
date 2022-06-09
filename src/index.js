import React from "react";
import ReactDOM from "react-dom";
//import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { createStore } from "redux";
import { Provider } from "react-redux";
import { loadState, saveState } from "./localStorage";
import store, { Persistor } from "./redux/store";
import { PersistGate } from "redux-persist/es/integration/react";

const persistedState = loadState();

store.subscribe(() => {
  saveState(store);
});

ReactDOM.render(
  <Provider store={store}>
    <PersistGate Loading={null} persistor={Persistor}>
      {" "}
      <App />
    </PersistGate>
  </Provider>,
  document.getElementById("root")
);

serviceWorker.register();
