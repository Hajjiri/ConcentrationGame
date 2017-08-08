import React, { Component } from "react";
import { View, TouchableOpacity, Image } from "react-native";
import PropTypes from "prop-types";

export default class Cell extends Component {
  render() {    
    return (
      <TouchableOpacity onPress={this.props.onPress}>
        <Image
          style={{
            width: 60,
            height: 60,
            marginHorizontal: 1
          }}
          source={this.props.item.imageUrl}
        />
      </TouchableOpacity>
    );
  }
}

Cell.propTypes = {
  onPress: PropTypes.func.isRequired,
  item: PropTypes.object.isRequired
};
