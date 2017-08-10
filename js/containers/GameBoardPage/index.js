import React, { Component } from "react";
import { View, TouchableOpacity, Text, ScrollView } from "react-native";
import autobind from "autobind-decorator";
const timer = require("react-native-timer");

import GameEngine from "@game_engine/gameEngine";
import Button from "@components/Button";
import { Toastr } from "@components/Toastr";
import ImageGrid from "@components/ImageGrid";

export default class GameBoardPage extends Component {
  static navigationOptions = ({ navigation, screenProps }) => ({
    title: "Concentration game challenges you!"
  });
  constructor(props) {
    super(props);
    this.state = {
      nodes: [],
      difficulty: "hard",
      started: false
    };
  }

  componentWillMount() {
    this.setState({
      nodes: GameEngine.determineDifficulty(this.state.difficulty).nodes
    });
  }
  componentWillUnmount() {
    timer.clearTimeout(this);
  }
  updateBoardUI() {
    this.setState({});
  }

  @autobind
  onCellSelected(cell) {
    if (!cell.isHalted()) {
      if (!cell.isBurnt()) {
        if (GameEngine.checkAvailability(this.state.nodes)) {
          // if only one card is revealed the move is available, else, blocked
          cell.unTail();
          this.updateBoardUI();

          timer.setTimeout(
            this,
            "updateSuccess",
            () => {
              GameEngine.selectedNode(cell, this.state.nodes);
              this.updateBoardUI();
              if (GameEngine.checkGameEnd(this.state.nodes)) {
                Toastr.makeToast("Wow. You really did it! Congratulation..");
              }
            },
            700
          );
        } else {
          Toastr.makeToast("Only two cards in one turn allowed..");
        }
      }
    } else {
      Toastr.makeToast("Press start, Enjoy!..");
    }
  }
  @autobind
  startGame() {
    if (!this.state.started) {
      GameEngine.unBlockNodes(this.state.nodes);
      this.setState({ started: true });
    } else {
      this.setState({
        started: false,
        nodes: GameEngine.determineDifficulty(this.state.difficulty).nodes
      });
      this.updateBoardUI();
    }
  }

  render() {
    let startButton = "Start";
    if (this.state.started) {
      startButton = "Restart";
    }
    return (
      <View style={styles.container}>
        <View style={styles.content}>
          <Button button_text={startButton} onPress={this.startGame} />
        </View>

        <ScrollView>
          <ImageGrid
            nodes={this.state.nodes}
            rowSize={this.state.difficulty === "easy" ? 2 : 4}
            onCellSelected={this.onCellSelected}
          />
        </ScrollView>
      </View>
    );
  }
}

import styles from "./styles";
