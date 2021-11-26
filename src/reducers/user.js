import store from "./store";
import { USER_SIGN_UP, USER_SIGN_IN, USER_SIGN_OUT } from "../actions/user";

export default function user(state = store.user, action) {
  switch (action.type) {
    case USER_SIGN_IN:
      return {
        ...state,
        userId: action.userId,
        fullName: action.fullName,
        isUserSignedIn: action.isUserSignedIn,
      };
    case USER_SIGN_UP:
      return {
        ...state,
        userId: action.userId,
        fullName: action.fullName,
        isUserSignedIn: action.isUserSignedIn,
      };
    case USER_SIGN_OUT:
      return {
        ...state,
        userId: action.userId,
        fullName: action.fullName,
        isUserSignedIn: action.isUserSignedIn,
      };
    default:
      return state;
  }
}
