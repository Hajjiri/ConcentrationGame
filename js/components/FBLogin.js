import React, { Component } from "react";
import {
  LoginButton,
  AccessToken,
  GraphRequest,
  GraphRequestManager
} from "react-native-fbsdk";
import PropTypes from "prop-types";

export default class FBLogin extends Component {
  onLoginFinished = (error, result) => {
    if (error) {
      this.props.OnLoginFailed(result.error);
    } else if (result.isCancelled) {
      this.props.OnLoginCanceled();
    } else {
      AccessToken.getCurrentAccessToken().then(data => {
        const responseInfoCallback = (error, result) => {
          if (error) {
            this.props.OnLoginFailed(result.error);
          } else {
            let userName = result.name;
            let userImage =
              "https://graph.facebook.com/" +
              result.id +
              "/picture?type=square";
            var userData = Object.assign({}, data, {
              userName: userName,
              userImage: userImage
            });
            this.props.OnLoginSucceed(userData);
          }
        };
        let accessToken = data.accessToken;
        const infoRequest = new GraphRequest(
          "/me",
          {
            accessToken: accessToken,
            parameters: {
              fields: {
                string: "name"
              }
            }
          },
          responseInfoCallback
        );
        // starts the graph request.
        new GraphRequestManager().addRequest(infoRequest).start();
      });
    }
  };
  onLogoutFinished = () => this.props.onLogout();

  render() {
    return (
      <LoginButton
        onLoginFinished={this.onLoginFinished}
        onLogoutFinished={this.onLogoutFinished}
      />
    );
  }
}

FBLogin.propTypes = {
  OnLoginSucceed: PropTypes.func,
  OnLoginFailed: PropTypes.func,
  OnLoginCanceled: PropTypes.func,
  onLogout: PropTypes.func
};
