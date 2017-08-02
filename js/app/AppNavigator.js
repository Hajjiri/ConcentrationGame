import { Platform } from 'react-native';
import { StackNavigator } from 'react-navigation';
import { Routes } from '@config/custom_routes';

const AppNavigator = StackNavigator(Routes, {
  headerMode: Platform.select({
    ios: () => 'float',
    android: () => 'screen',
  })(),
  navigationOptions: {
    headerBackTitle: null,
    headerStyle: {
      backgroundColor: 'purple'
    },
    headerTitleStyle: {
      fontFamily: 'Cochin',
      fontSize: 14,
      color: 'white'
    },
    headerTintColor: 'white'
  }
});

export default AppNavigator;
