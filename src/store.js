import { createStore } from "redux";

import { INCREMENT_COUNT } from './actions'

const initialState = {
  count: 0,
}

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case INCREMENT_COUNT:
      return {
        ...state,
        count: state.count + 1,
      }
    default:
      return state
  }
}

export default createStore(rootReducer)