import React, { Component } from 'react';
import { LoginButton, AccessToken } from 'react-native-fbsdk';
import PropTypes from 'prop-types';

export default class FBLogin extends Component {  
  render() {
    return (
      <LoginButton        
        onLoginFinished={
          (error, result) => {
            if (error) {
              this.props.OnLoginFailed(result.error);
            } else if (result.isCancelled) {              
              this.props.OnLoginCanceled();
            } else {
              AccessToken.getCurrentAccessToken().then(
                (data) => {
                  this.props.OnLoginSucceed(data.accessToken.toString());
                }
              )
            }
          }
        }
        onLogoutFinished={() => this.props.onLogout()} />
      //TODO: handle logout error, and result cases if possible?
    );
  }
}
FBLogin.propTypes = {
  OnLoginSucceed: PropTypes.func,
  OnLoginFailed: PropTypes.func,
  OnLoginCanceled: PropTypes.func,
  onLogout: PropTypes.func
};