import React, { Component } from "react";
import { View, TouchableOpacity } from "react-native";
import PropTypes from "prop-types";

import ImageGrid from "./ImageGrid";

class Board extends Component {
  render() {
    return (
      <ImageGrid
        nodes={this.props.gameObj.nodes}
        rowSize={this.props.difficulty === "easy" ? 2 : 4}
      />
    );
  }
}

Board.propTypes = {
  gameObj: PropTypes.object.isRequired,
  difficulty: PropTypes.string
};

export default Board;
