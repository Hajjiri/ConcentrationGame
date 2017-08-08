import React, { Component } from "react";
import { View, Image, ScrollView } from "react-native";

import PropTypes from "prop-types";
import _ from "lodash";
import autobind from 'autobind-decorator';
import Cell from "./Cell";

export default class ImageGrid extends Component {
  
  @autobind
  onCellSelected() {
    console.log("clicked");    
  }
  renderRow(images) {
    return (
      <View
        style={{
          flex: 1,
          flexDirection: "row"
        }}
      >
        {images.map(function(item, j) {          
          return (
            <View key={j}>
              <Cell item={item} onPress={this.onCellSelected} />
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
            <View style={{ height: 60, marginVertical: 1 }} key={i}>
              {this.renderRow(rowImages)}
            </View>
          );
        })}
      </View>
    );
  }

  render() {
    console.log(this.props.nodes);
    return this.renderImages(this.props.rowSize);
  }
}

ImageGrid.propTypes = {
  nodes: PropTypes.array.isRequired,
  rowSize: PropTypes.number.isRequired
};
