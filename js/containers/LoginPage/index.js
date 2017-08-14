import React, { Component } from "react";
import { View, Text } from "react-native";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import autobind from "autobind-decorator";
import _ from "lodash";
import FBLogin from "@components/FBLogin";
import { Toastr } from "@components/Toastr";
import { resetStack } from "@app_init/NavigationActionsMethods";
import { SCREEN } from "@config/custom_routes";

import * as authenticationActions from "@actions/authenticationActions";
const mapDispatchToProps = dispatch => ({
  authenticationActions: bindActionCreators(authenticationActions, dispatch)
});
const mapStateToProps = store => ({
  authenticationStore: store.authenticationStore
});
@connect(mapStateToProps, mapDispatchToProps)
export default class LoginPage extends Component {
  static navigationOptions = ({ navigation, screenProps }) => ({
    title: "Join our community of best players online today!"
  });

  componentWillMount() {
    let user = this.props.authenticationStore.user;
    if (!_.isEmpty(user)) {
      this.navigateToHomePage(user);
    }
  }
  navigateToHomePage(user) {
    resetStack(this.props.navigation, SCREEN.HOME, {
      user: user
    });
  }

  @autobind
  OnLoginSucceed(fbResponseData) {
    const token = fbResponseData.accessToken.toString();
    const userId = fbResponseData.userID.toString();
    const userName = fbResponseData.userName;
    const userImage = fbResponseData.userImage;
    const user = {
      userId: userId,
      userAccessToken: token,
      userName: userName,
      userImage: userImage
    };
    this.props.authenticationActions.persistUserState(user);
    Toastr.makeToast("Logged in successfully.");
    this.navigateToHomePage(user);
  }
  @autobind
  OnLoginFailed(error) {
    Toastr.makeToast(
      "An error happened during the login process: " + error + "."
    );
  }
  @autobind
  OnLoginCanceled() {
    Toastr.makeToast("Have you cancelled the login process!");
  }
  @autobind
  onLogout() {
    this.props.authenticationActions.dropUserState();
    Toastr.makeToast("Logged out successfully.");
    resetStack(this.props.navigation, SCREEN.LOGIN);
  }

  render() {
    return (
      <View style={styles.container}>
        <FBLogin
          OnLoginSucceed={this.OnLoginSucceed}
          OnLoginFailed={this.OnLoginFailed}
          OnLoginCanceled={this.OnLoginCanceled}
          onLogout={this.onLogout}
        />
        <Text style={styles.login_header}>
          This game is awesome. You can login through your facebook account.
        </Text>
      </View>
    );
  }
}

import styles from "./styles";
