import React, { Component } from 'react';
import { View, Text } from 'react-native';

export default class HomePage extends Component {
    static navigationOptions = ({ navigation, screenProps }) => ({
        title: 'Best Game Ever Yet!'
    });
    constructor(props) {
        super(props);
    }

    // this.props.navigation.navigate('HomePage');    

    render() {
        return (
            <View>
                <View style={styles.container}>
                    <Text>Wow. It really works!</Text>
                </View>                
            </View>
        );
    }
}

import styles from './styles';
