import { createStore, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";
import user from "./user"

export default createStore(
  combineReducers({
    user
  }),
  applyMiddleware(thunk)
);