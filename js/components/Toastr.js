import _ from 'lodash';
import { ToastAndroid } from 'react-native';

export var Toastr = {
    makeToast: function (message) {     
        if(_.isEmpty(message)){
            message = "Error. Please contact that bloody developer.";
        }  
        if (typeof message === "object") {
            message = JSON.stringify(message);
        }
        ToastAndroid.show(message, ToastAndroid.LONG);
    }
};
