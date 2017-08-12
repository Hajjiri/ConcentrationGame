import React, { Component } from "react";
import { View, Text, ScrollView } from "react-native";

import autobind from "autobind-decorator";
import { Toastr } from "@components/Toastr";
import Button from "@components/Button";
import { resetStack } from "@app_init/NavigationActionsMethods";
import { SCREEN } from "@config/custom_routes";

export default class ScorePage extends Component {
  static navigationOptions = ({ navigation, screenProps }) => ({
    title: "Score!"
  });

  @autobind
  navigateToMainMenu() {
    resetStack(this.props.navigation, SCREEN.HOME, {
      user: {
        userId: this.props.navigation.state.params.user.userId
      }
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <ScrollView justifyContent="center">
          <View style={styles.content}>
            <Text style={styles.header}>
              You just scored, {this.props.navigation.state.params.score}
            </Text>
          </View>
        </ScrollView>

        <View style={styles.content}>
          <Button button_text={"Main Menu"} onPress={this.navigateToMainMenu} />
        </View>
      </View>
    );
  }
}

import styles from "./styles";
