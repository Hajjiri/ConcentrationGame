import React, { Component } from 'react';
import { View, Text } from 'react-native';

import autobind from 'autobind-decorator';
import FBLogin from '@components/FBLogin'
import { Toastr } from '@components/Toastr';
import { resetStack } from '@app_init/NavigationActionsMethods';

export default class HomePage extends Component {
    static navigationOptions = ({ navigation, screenProps }) => ({
        title: 'Best Game Ever Yet!'
    });

    @autobind
    onLogout() {
        Toastr.makeToast("Logged out successfully.");
        resetStack(this.props.navigation, "LoginPage");
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.login_header}>Wow. It really works! Hello, {this.props.navigation.state.params.user.userId}</Text>
                <FBLogin
                    onLogout={this.onLogout}
                />
            </View>
        );
    }
}

import styles from './styles';
