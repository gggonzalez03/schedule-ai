import * as api from "./api";

export const USER_SIGN_IN = "USER_SIGN_IN";
export const USER_SIGN_UP = "USER_SIGN_UP";
export const USER_SIGN_OUT = "USER_SIGN_OUT";

export const startSession = (username) => {
  if (username != null) localStorage.setItem("username", username);
};

export const endSession = (id) => {
  localStorage.removeItem(id);
};

export const getSession = (id) => {
  return localStorage.getItem(id);
};

export const userSignInAction =
  (signInFormData) => async (dispatch, getState) => {
    await api.login(
      {
        username: signInFormData.username,
        password: signInFormData.password,
      },
      (result) => {
        if (result.success) {
          startSession(result.username);
          dispatch({
            type: USER_SIGN_IN,
            userId: result.username,
            fullName: result.username,
            isUserSignedIn: result.success,
          });
        }
      },
      (e) => console.log(e)
    );
  };

export const userSignUpAction =
  (signUpFormData) => async (dispatch, getState) => {
    await api.signUp(
      {
        username: signUpFormData.username,
        password: signUpFormData.password,
        repeatPassword: signUpFormData.repeatPassword,
      },
      (result) => {
        if (result.success) {
          startSession(result.username);
          dispatch({
            type: USER_SIGN_UP,
            userId: result.username,
            fullName: result.username,
            isUserSignedIn: result.success,
          });
        }
      },
      (e) => console.log(e)
    );
  };

export const userSignOutAction = () => async (dispatch, getState) => {
  await api.signout().then((result) => {
    endSession('username');
    dispatch({
      type: USER_SIGN_OUT,
      userId: null,
      fullName: null,
      isUserSignedIn: !result.success,
    });
  });
};
