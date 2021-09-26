import * as api from "./api";

export const USER_SIGN_IN = "USER_SIGN_IN";
export const USER_SIGN_OUT = "USER_SIGN_OUT";

export const userSignInAction = () => async (dispatch, getState) => {
  await api.googleSignIn().then((result) => {
    dispatch({
      type: USER_SIGN_IN,
      userId: result.userId,
      fullName: result.fullName,
      sessionId: result.sessionId,
      isUserSignedIn: result.isUserSignedIn,
    });
  });
};

export const userSignOutAction = () => async (dispatch, getState) => {
  await api.googleSignOut().then((result) => {
    dispatch({
      type: USER_SIGN_OUT,
      userId: null,
      fullName: null,
      sessionId: null,
      isUserSignedIn: !result.success,
    });
  });
};
