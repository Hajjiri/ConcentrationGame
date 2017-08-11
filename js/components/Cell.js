import React, { Component } from "react";
import { View, TouchableOpacity, Image } from "react-native";
import PropTypes from "prop-types";

import { DefaultValueSettings } from "@accessors/settings";

export default class Cell extends Component {
  render() {
    let source = "";
    if (
      (!this.props.cell.isHalted() && this.props.cell.isBurnt()) ||
      (!this.props.cell.isHalted() && this.props.cell.isHead())
    ) {      
      source = this.props.cell.imageUrl;
    } else if (this.props.cell.isHalted() || this.props.cell.isTail()) {
      source = DefaultValueSettings.getThumbnailUrl();
    }
    return (
      <TouchableOpacity
        onPress={this.props.onPress.bind(
          this,
          this.props.cell
        )}
      >
        <Image
          style={{
            width: this.props.cell_width,
            height: this.props.cell_height,
            marginHorizontal: 1
          }}
          source={source}
        />
      </TouchableOpacity>
    );
  }
}

Cell.propTypes = {
  onPress: PropTypes.func.isRequired,
  cell: PropTypes.object.isRequired
};
