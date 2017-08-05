import React, { Component } from 'react';
import { LoginButton, AccessToken } from 'react-native-fbsdk';
import PropTypes from 'prop-types';

export default class FBLogin extends Component {

  onLoginFinished = (error, result) => {
    if (error) {
      this.props.OnLoginFailed(result.error);
    } else if (result.isCancelled) {
      this.props.OnLoginCanceled();
    } else {
      AccessToken.getCurrentAccessToken().then(
        (data) => {
          this.props.OnLoginSucceed(data);
        }
      )
    }
  }
  onLogoutFinished = () => this.props.onLogout();

  render() {
    return (
      <LoginButton
        onLoginFinished={this.onLoginFinished}
        onLogoutFinished={this.onLogoutFinished} />
    );
  }
}

FBLogin.propTypes = {
  OnLoginSucceed: PropTypes.func,
  OnLoginFailed: PropTypes.func,
  OnLoginCanceled: PropTypes.func,
  onLogout: PropTypes.func
};