import React, { Component } from "react";
import { connect } from "react-redux";
import { addNavigationHelpers } from "react-navigation";
import AppNavigator from "./AppNavigator";
import store from "./store";

class App extends Component {
  render() {
    return (
      <AppNavigator
        navigation={addNavigationHelpers({
          dispatch: this.props.dispatch,
          state: this.props.nav
        })}
      />
    );
  }
}

const mapStateToProps = store => ({
  nav: store.navigation
});
const AppWithNavigationState = connect(mapStateToProps)(App);

export default AppWithNavigationState;
