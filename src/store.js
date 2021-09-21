import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { INCREMENT_COUNT } from './actions'

const initialState = {
  count: 0,
}

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case INCREMENT_COUNT:
      return {
        ...state,
        count: action.payload,
      }
    default:
      return state
  }
}

export default createStore(rootReducer, applyMiddleware(thunk))