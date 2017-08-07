import React, { Component } from "react";
import { View, TouchableOpacity } from "react-native";
import PropTypes from "prop-types";

import ImageGrid from "./ImageGrid";

class Board extends Component {
  render() {
    return (
      <ImageGrid
        nodes={this.props.getGameObj.nodes}
        rowSize={this.props.difficulty === "easy" ? 2 : 4}
      />
    );
  }
}

Board.propTypes = {
  getGameObj: PropTypes.object.isRequired,
  difficulty: PropTypes.string
};

export default Board;
