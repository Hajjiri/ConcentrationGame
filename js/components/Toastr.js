import _ from "lodash";
import { ToastAndroid, Platform } from "react-native";
import Toast from "react-native-root-toast";

var defaultOption = {
  duration: Toast.durations.SHORT,
  position: -100,
  shadow: true,
  animation: true,
  hideOnPress: true,
  delay: 0
};

export var Toastr = {
  makeToast: function(message) {
    if (_.isEmpty(message)) {
      message = "Error. Please contact that bloody developer..";
    }
    if (typeof message === "object") {
      message = JSON.stringify(message);
    }
    if (Platform.OS === "ios") {
      Toast.show(message, defaultOption);
    } else {
      ToastAndroid.show(message, ToastAndroid.SHORT);
    }
  }
};
