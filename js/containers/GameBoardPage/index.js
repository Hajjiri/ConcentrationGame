import React, { Component } from "react";
import { View, TouchableOpacity, Text, ScrollView } from "react-native";
import autobind from "autobind-decorator";
const timer = require("react-native-timer");
import _ from "lodash";
import GameEngine from "@game_engine/gameEngine";
import Button from "@components/Button";
import { Toastr } from "@components/Toastr";
import ImageGrid from "@components/ImageGrid";
import { SCREEN } from '@config/custom_routes';
import moment from "moment";

export default class GameBoardPage extends Component {
  static navigationOptions = ({ navigation, screenProps }) => ({
    title: "Concentration game challenges you!"
  });
  constructor(props) {
    super(props);
    this.state = {
      nodes: [],
      difficulty: "hard",
      started: false,
      startedAt: null
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
                this.endGame();
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
      this.initateGame();
    } else {
      this.restartGame();
    }
  }

  endGame() {
    let secondsPassed = this.calculateScore(moment(new Date()));
    if (secondsPassed != null) {
      Toastr.makeToast("Wow. You did it in: " + secondsPassed + "!");
    } else {
      Toastr.makeToast("Wow. You really did it! Congratulation..");
    }
    this.navigateToScorePage(secondsPassed);
  }
  navigateToScorePage(score) {
    this.props.navigation.navigate(SCREEN.SCORE, {
      user: {
        userId: this.props.navigation.state.params.user.userId
      },
      score: score
    });
  }
  initateGame() {
    GameEngine.unBlockNodes(this.state.nodes);
    this.setState({
      started: true,
      startedAt: moment(new Date())
    });
  }
  restartGame() {
    this.setState({
      started: false,
      startedAt: null,
      nodes: GameEngine.determineDifficulty(this.state.difficulty).nodes
    });
  }
  calculateScore(endStamp) {
    if (!_.isEmpty(this.state.startedAt) && !_.isEmpty(endStamp)) {
      let gameDuration = moment.duration(endStamp.diff(this.state.startedAt));
      let secondsPassed = gameDuration.as("seconds");
      return secondsPassed;
    }
    return null;
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
