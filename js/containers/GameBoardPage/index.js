import React, { Component } from "react";
import { View, Text, ScrollView } from "react-native";

import GameEngine from "@game_engine/gameEngine";
import Board from "@components/Board";
import Button from "@components/Button";

export default class GameBoardPage extends Component {
  static navigationOptions = ({ navigation, screenProps }) => ({
    title: "Concentration game challenges you!"
  });

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.content}>
          <Text>Press on "start" to rock and roll</Text>
          <Button button_text={"Start"} onPress={this.startGame} />
        </View>

        <View style={styles.board}>
          <Board
            getGameObj={GameEngine.determineDifficulty("hard")}
            difficulty={"hard"}
          />
        </View>
      </View>
    );
  }
}

import styles from "./styles";
