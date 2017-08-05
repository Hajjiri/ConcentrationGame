import { applyMiddleware, createStore, compose } from "redux";
import { createLogger } from "redux-logger";
import mainReducer from "@reducers";
import { persistStore, autoRehydrate } from 'redux-persist'


const middlewares = applyMiddleware(createLogger({}));
const store = createStore(mainReducer,
    compose(
        middlewares,
        autoRehydrate()
    )
);

import { AsyncStorage } from 'react-native'
persistStore(store, { storage: AsyncStorage })
export default store;