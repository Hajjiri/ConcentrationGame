import React, { Component } from 'react';
import { View, Text } from 'react-native';

import autobind from 'autobind-decorator';
import FBLogin from '@components/FBLogin'
import { Toastr } from '@components/Toastr';
import { resetStack } from '@app_init/NavigationActionsMethods';

export default class LoginPage extends Component {
    static navigationOptions = ({ navigation, screenProps }) => ({
        title: 'Join our community of best players online today!'
    });

    @autobind
    OnLoginSucceed(fbResponseData) {
        var token = fbResponseData.accessToken.toString();
        var user = fbResponseData.userID.toString();
        Toastr.makeToast("Logged in successfully.");
        resetStack(this.props.navigation, "HomePage", {
            user: {
                userId: user,
                userAccessToken: token
            }
        });
    }
    @autobind
    OnLoginFailed(error) {
        Toastr.makeToast("An error happened during the login process: " + error + ".");
    }
    @autobind
    OnLoginCanceled() {
        Toastr.makeToast("Have you cancelled the login process?");
    }
    @autobind
    onLogout() {
        Toastr.makeToast("Logged out successfully.");
        resetStack(this.props.navigation, "LoginPage");
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

import styles from './styles';
