import React, { Component } from "react";
import { View, Image, ScrollView, Dimensions, Platform } from "react-native";
import Orientation from "react-native-orientation";
import { Toastr } from "@components/Toastr";
import PropTypes from "prop-types";
import _ from "lodash";
import autobind from "autobind-decorator";
import Cell from "./Cell";

var { height, width } = Dimensions.get("window");

export default class ImageGrid extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cell_width: 0,
      cell_height: 0
    };
    this.initial = "";
  }

  componentWillMount() {
    this.initial = Orientation.getInitialOrientation();
  }

  getCellSquareSize(width, height, itemsToDivide) {
    var sideToConsider = 0;
    if (width <= height) sideToConsider = width;
    else sideToConsider = height;

    var retVal = (sideToConsider - itemsToDivide * 2) / itemsToDivide;
    return retVal;
  }
  processForAndroid(width, height, orientationFrom, orientationTo) {
    if (
      (_.isEqual(orientationFrom, "") ||
        typeof orientationFrom == "undefined") &&
      _.isEqual(orientationTo, "LANDSCAPE")
    ) {
      return {
        width: height,
        height: width
      };
    } else if (
      (_.isEqual(orientationFrom, "") ||
        typeof orientationFrom == "undefined") &&
      _.isEqual(orientationTo, "PORTRAIT")
    ) {
      return {
        width: height,
        height: width
      };
    } else if (
      _.isEqual(orientationFrom, "LANDSCAPE") &&
      _.isEqual(orientationTo, "PORTRAIT")
    ) {
      return {
        width: height,
        height: width
      };
    } else if (
      _.isEqual(orientationFrom, "PORTRAIT") &&
      _.isEqual(orientationTo, "LANDSCAPE")
    ) {
      return {
        width: height,
        height: width
      };
    } else
      return {
        width: width,
        height: height
      };
  }

  componentDidMount() {
    Orientation.addOrientationListener(this._orientationDidChange);
    this.calculateCellSize();
  }

  calculateCellSize(orientation) {
    const window = Platform.select({
      ios: () => Dimensions.get("window"),
      android: () => {
        var currWindow = Dimensions.get("window");
        return this.processForAndroid(
          currWindow.width,
          currWindow.height,
          this.initial,
          orientation
        );
      }
    })();

    this.initial = orientation;

    this.setState({
      cell_width: this.getCellSquareSize(
        window.width - 50,
        window.height - 150,
        this.props.rowSize
      ),
      cell_height: this.getCellSquareSize(
        window.width - 50,
        window.height - 150,
        this.props.rowSize
      )
    });
  }

  _orientationDidChange = orientation => {
    this.calculateCellSize(orientation);
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
                cell_width={this.state.cell_width}
                cell_height={this.state.cell_height}
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
