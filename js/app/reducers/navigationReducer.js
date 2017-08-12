import { BackAndroid } from "react-native";
import AppNavigator from "@app_init/AppNavigator";

const initialState = AppNavigator.router.getStateForAction(
  AppNavigator.router.getActionForPathAndParams("LoginPage")
);

export default function reducer(state = initialState, action) {
  if (action.type === "Navigation/BACK" && state.routes.length === 1) {
    BackAndroid.exitApp();
  }

  const nextState = AppNavigator.router.getStateForAction(action, state);

  return nextState || state;
}
