import React, { Component } from "react";
import { View, Image, ScrollView, Dimensions } from "react-native";
import Orientation from "react-native-orientation";
import { Toastr } from "@components/Toastr";

import PropTypes from "prop-types";
import _ from "lodash";
import autobind from "autobind-decorator";
import Cell from "./Cell";

var { height, width } = Dimensions.get("window");

function getCellSquareSize(width, height, itemsToDivide) {
  var sideToConsider = 0;
  if (width <= height) sideToConsider = width;
  else sideToConsider = height;

  var retVal = (sideToConsider - itemsToDivide * 2) / itemsToDivide;
  Toastr.makeToast(`Tile: ${retVal}`);
  return retVal;
}

export default class ImageGrid extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tile_width: 0,
      tile_height: 0
    };
  }

  componentDidMount() {
    //Toastr.makeToast(`Height: ${height}, Width: ${width}`);
    Orientation.addOrientationListener(this._orientationDidChange);
    this.calculateTileSize();
  }

  calculateTileSize()
  {
    var window = Dimensions.get("window");
    this.setState({
      tile_width: getCellSquareSize(
        window.width - 50,
        window.height - 150,
        this.props.rowSize
      ),
      tile_height: getCellSquareSize(
        window.width - 50,
        window.height - 150,
        this.props.rowSize
      )
    });
  }

  _orientationDidChange = orientation => {
    this.calculateTileSize();
  };

  componentWillUnmount() {
    Orientation.removeOrientationListener(this._orientationDidChange);
  }

  renderRow(images, i) {
    return (
      <View
        style={{
          flex: 1,
          flexDirection: "row"
        }}
      >
        {images.map(function(cell, j) {
          return (
            <View key={j}>
              <Cell
                cell_width={this.state.tile_width}
                cell_height={this.state.tile_height}
                cell={cell}
                onPress={this.props.onCellSelected}
              />
            </View>
          );
        }, this)}
      </View>
    );
  }

  renderImages(rowSize) {
    return (
      <View
        style={{
          flex: 1,
          flexDirection: "column",
          alignItems: "center"
        }}
      >
        {_.chunk(this.props.nodes, rowSize).map((rowImages, i) => {
          return (
            <View
              style={{
                marginVertical: 1,
                flex: 0.25
              }}
              key={i}
            >
              {this.renderRow(rowImages, i)}
            </View>
          );
        })}
      </View>
    );
  }

  render() {
    return this.renderImages(this.props.rowSize);
  }
}

ImageGrid.propTypes = {
  nodes: PropTypes.array.isRequired,
  rowSize: PropTypes.number.isRequired,
  onCellSelected: PropTypes.func.isRequired
};
