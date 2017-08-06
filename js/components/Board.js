import React, { Component } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';

class Board extends Component {
    render() {
        return (
            <TouchableOpacity onPress={this.props.onPress}>
                <View>
                    <Text>
                        Game board wanna be!
                        {console.log(this.props.getGameObj)}
                    </Text>
                </View>
            </TouchableOpacity>
        );
    }
}

Board.propTypes = {
    getGameObj: PropTypes.object.isRequired
};

export default Board;
