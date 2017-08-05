import * as authenticationActions from '@actions/authenticationActions';

export default function reducer(state = {
    user: {}
}, action) {
    switch (action.type) {      
        case authenticationActions.PERSIST_USERSTATE: {
            return {
                ...state, user: action.payload
            };
        }
        case authenticationActions.DROP_USERSTATE: {
            return {
                ...state, user: null
            };
        }
    }
    return state;
}
