import { applyMiddleware, createStore, compose } from "redux";
import { createLogger } from "redux-logger";
import mainReducer from "@reducers";
import { autoRehydrate } from "redux-persist";
import thunk from "redux-thunk";
import promise from "redux-promise-middleware";

const middlewares = applyMiddleware(promise(), thunk, createLogger({}));
const store = createStore(mainReducer, compose(middlewares, autoRehydrate()));

export default store;