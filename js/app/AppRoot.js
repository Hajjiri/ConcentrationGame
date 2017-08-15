import React, { Component } from "react";
import { View } from "react-native";
import { Provider } from "react-redux";
import { AsyncStorage } from "react-native";
import { persistStore } from "redux-persist";
import Spinner from "react-native-loading-spinner-overlay";
import AppWithNavigationState from "./App";
import store from "./store";

export default class ApplicationRoot extends Component {
  constructor() {
    super();
    this.state = { rehydrated: false };
  }
  componentWillMount() {
    persistStore(store, { storage: AsyncStorage }, () => {
      this.setState({ rehydrated: true });
    });
  }
  render() {
    if (!this.state.rehydrated) {
      return (
        <View style={{ flex: 1 }}>
          <Spinner
            visible={true}
            textContent={"Loading game data. Please wait..."}
            textStyle={{ color: "#421C52" }}
            color={"#421C52"}
            overlayColor={"rgba(0, 0, 0, 0.25)"}
            // cancelable={true}
          />
        </View>
      );
    }
    return (
      <Provider store={store}>
        <AppWithNavigationState />
      </Provider>
    );
  }
}
