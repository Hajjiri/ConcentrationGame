import React, { Component } from "react";
import { View, Text, ScrollView, Image } from "react-native";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import autobind from "autobind-decorator";
import FBLogin from "@components/FBLogin";
import { Toastr } from "@components/Toastr";
import Button from "@components/Button";
import { resetStack } from "@app_init/NavigationActionsMethods";

import * as authenticationActions from "@actions/authenticationActions";
const mapDispatchToProps = dispatch => ({
  authenticationActions: bindActionCreators(authenticationActions, dispatch)
});
const mapStateToProps = store => ({
  authenticationStore: store.authenticationStore
});
@connect(mapStateToProps, mapDispatchToProps)
export default class HomePage extends Component {
  static navigationOptions = ({ navigation, screenProps }) => ({
    title: "Challenge your memory!"
  });

  @autobind
  newGame() {
    this.props.navigation.navigate("GameBoardPage", {
      user: {
        userId: this.props.navigation.state.params.user.userId
      }
    });
  }
  @autobind
  onLogout() {
    this.props.authenticationActions.dropUserState();
    Toastr.makeToast("Logged out successfully.");
    resetStack(this.props.navigation, "LoginPage");
  }

  render() {
    return (
      <View style={styles.container}>
        <ScrollView justifyContent="center">
          <View style={styles.content}>
            <Image
              style={styles.userImage}
              source={{
                uri: this.props.navigation.state.params.user.userImage
              }}
            />
            <Text style={styles.header}>
              Welcome, {this.props.navigation.state.params.user.userName}
            </Text>
          </View>
          <View style={styles.content}>
            <Text style={styles.header}>Try it. Don't get too addicted!</Text>
            <Button
              button_text={"Play"}
              onPress={this.newGame}              
            />
          </View>
        </ScrollView>

        <View style={styles.content}>
          <FBLogin onLogout={this.onLogout} />
        </View>
      </View>
    );
  }
}

import styles from "./styles";
