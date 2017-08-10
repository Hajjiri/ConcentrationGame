import React, { Component } from "react";
import { View, TouchableOpacity } from "react-native";
import PropTypes from "prop-types";
import autobind from "autobind-decorator";
const timer = require("react-native-timer");
import GameEngine from "@game_engine/gameEngine";
import ImageGrid from "./ImageGrid";

class Board extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nodes: props.gameObj.nodes
    };
  }
  componentWillUnmount() {
    timer.clearTimeout(this);
  }

  updateBoardUI() {
    this.setState({});
  }

  @autobind
  onCellSelected(cell) {
    if (!cell.isBurnt() && !cell.isHalted()) {
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
          },
          50
        );
      }
    }
  }

  render() {
    return (
      <ImageGrid
        nodes={this.state.nodes}
        rowSize={this.props.difficulty === "easy" ? 2 : 4}
        onCellSelected={this.onCellSelected}
      />
    );
  }
}

Board.propTypes = {
  gameObj: PropTypes.object.isRequired,
  difficulty: PropTypes.string
};

export default Board;
