import React, { Component } from "react";
import { View, Image, ScrollView } from "react-native";
import PropTypes from "prop-types";

import _ from "lodash";

export default class ImageGrid extends Component {
  renderRow(images) {
    return (
      <View
        style={{
          justifyContent: "space-between",
          flex: 1,
          flexDirection: "row"
        }}
      >
        {images.map(function(item, j) {
          return (
            <View key={j}>
              <Image
                style={{
                  width: 60,
                  height: 60,                  
                  marginHorizontal: 1
                }}
                source={item.imageUrl}
              />
            </View>
          );
        })}
      </View>
    );
  }

  renderImages(rowSize) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "space-between",
          flexDirection: "column"
        }}
      >
        {_.chunk(this.props.nodes, rowSize).map((rowImages, i) => {
          return (
            <View style={{ width: 60, height: 60, marginVertical: 1 }} key={i}>
              {this.renderRow(rowImages)}
            </View>
          );
        })}
      </View>
    );
  }

  render() {
    console.log(this.props.getGameObj);
    return this.renderImages(this.props.rowSize);
  }
}

ImageGrid.propTypes = {
  nodes: PropTypes.array.isRequired,
  rowSize: PropTypes.number.isRequired
};
