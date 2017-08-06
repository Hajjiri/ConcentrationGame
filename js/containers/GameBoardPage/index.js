import React, { Component } from 'react';
import { View, Text } from 'react-native';
import GameEngine from '@game_engine/gameEngine';
import Board from '@components/Board';

export default class GameBoardPage extends Component {
    static navigationOptions = ({ navigation, screenProps }) => ({
        title: 'Concentration game challenges you!'
    });

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.header}>Press on "start" to rock and roll</Text>
                <View>
                    <Board getGameObj={GameEngine.tempValuesGenerator()} />
                </View>
            </View>
        );
    }
}

import styles from './styles';


