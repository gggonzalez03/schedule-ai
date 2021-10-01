import { createStore, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";
import taskview from "./taskview";
import user from "./user"

export default createStore(
  combineReducers({
    user,
    taskview,
  }),
  applyMiddleware(thunk)
);