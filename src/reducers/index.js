import { createStore, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";
import taskview from "./taskview";
import user from "./user"

const store = createStore(
  combineReducers({
    user,
    taskview,
  }),
  applyMiddleware(thunk)
);

export default store;