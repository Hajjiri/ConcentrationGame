import { combineReducers } from "redux";
import navigationReducer from "./navigationReducer";
import authenticationReducer from "./authenticationReducer";
import imagesReducer from "./imagesReducer";

export default combineReducers({
  navigation: navigationReducer,
  authenticationStore: authenticationReducer,
  imagesStore: imagesReducer
});
