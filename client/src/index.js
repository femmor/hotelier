import React, { StrictMode } from "react";
import ReactDOM from "react-dom";
import { createStore } from "redux";
import { Provider } from "react-redux";
import { composeWithDevTools } from "redux-devtools-extension";
import "./index.css";
import 'antd/dist/antd.css';
import App from "./App";
import { rootReducer } from "./reducers";

// Create store
const store = createStore(rootReducer, composeWithDevTools());

ReactDOM.render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>,
  document.getElementById("root")
);
