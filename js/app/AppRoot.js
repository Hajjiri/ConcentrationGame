import React, { Component } from "react";
import { Provider } from "react-redux";
import AppWithNavigationState from "./App";
import store from "./store";

export default class ApplicationRoot extends Component {
  render() {
    return (
      <Provider store={store}>
        <AppWithNavigationState />
      </Provider>
    );
  }
}
