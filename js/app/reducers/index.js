import { combineReducers } from "redux";
import navigationReducer from "./navigationReducer";
import authenticationReducer from "./authenticationReducer";
export default combineReducers({
  navigation: navigationReducer,
  authenticationStore: authenticationReducer
});
