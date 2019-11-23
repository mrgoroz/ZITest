import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "./index.css";
import cartReducer from "./components/reducers/cartReducer";
import { Provider } from "react-redux";
import { createStore } from "redux";

// allows us to create a store that holds all of our state tree of our app
const store = createStore(cartReducer);

ReactDOM.render(
  // allows us to pass our store into the props
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
