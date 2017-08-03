import { NavigationActions } from 'react-navigation';

export function resetStack(navigation, screen, params = {}) {
    const resetAction = NavigationActions.reset({
        index: 0,
        actions: [
            NavigationActions.navigate(
                { routeName: screen, params: params }
            )
        ]
    });
    navigation.dispatch(resetAction)
}