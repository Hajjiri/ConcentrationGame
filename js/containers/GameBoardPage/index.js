import React, { Component } from 'react';
import { View, Text } from 'react-native';

// import autobind from 'autobind-decorator';
// import { Toastr } from '@components/Toastr'0;
// import Button from '@components/Button';

export default class GameBoardPage extends Component {
    static navigationOptions = ({ navigation, screenProps }) => ({
        title: 'Concentration game challenges you!'
    });
    
    
    //this.props.navigation.state.params.user.userId
    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.header}>A fine game should be here</Text>               
            </View>
        );
    }
}

import styles from './styles';


