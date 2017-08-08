import React, { Component } from "react";
import { View, TouchableOpacity } from "react-native";
import PropTypes from "prop-types";
import autobind from "autobind-decorator";

import ImageGrid from "./ImageGrid";

class Board extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nodes: props.gameObj.nodes
    };
  }

  @autobind
  onCellSelected(cell) {
    let { nodes } = this.state;
    cell.flipNode();
    this.setState({});
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
