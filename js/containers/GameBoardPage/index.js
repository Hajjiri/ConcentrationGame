import React, { Component } from "react";
import { View, Text, ScrollView } from "react-native";
import autobind from "autobind-decorator";

import GameEngine from "@game_engine/gameEngine";
import Board from "@components/Board";
import Button from "@components/Button";

export default class GameBoardPage extends Component {
  static navigationOptions = ({ navigation, screenProps }) => ({
    title: "Concentration game challenges you!"
  });

  @autobind
  startGame() {
    console.log("started");
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.content}>
          <Button button_text={"Start"} onPress={this.startGame} />
        </View>

        <ScrollView>
          <Board
            gameObj={GameEngine.determineDifficulty("hard")}
            difficulty={"hard"}
          />
        </ScrollView>
      </View>
    );
  }
}

import styles from "./styles";
