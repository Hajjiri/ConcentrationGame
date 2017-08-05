
import React, { Component } from 'react';
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';


class Button extends Component {
    render() {
        return (
            <TouchableOpacity onPress={this.props.onPress}>
                <View style={[styles.button, { backgroundColor: this.props.button_color }]}>
                    <Text style={[styles.button_text, this.props.button_text_style]}>
                        {this.props.button_text}
                    </Text>
                </View>
            </TouchableOpacity>
        );
    }
}

Button.propTypes = {
    button_color: PropTypes.string,
    button_text_style: PropTypes.any,
    button_text: PropTypes.string.isRequired,
    onPress: PropTypes.func.isRequired
};

Button.defaultProps = {
    button_color: '#732C7B'
};


let styles = StyleSheet.create({
    button: {
        margin: 5,
        backgroundColor: 'blue', // can be overriden by props
        justifyContent: 'center',
        width: 190
    },
    button_text: {
        padding: 10,
        height: 35,
        overflow: 'hidden',
        fontSize: 10,
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    } // can be overriden by props
});

export default Button;
