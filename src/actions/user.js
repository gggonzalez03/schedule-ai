import * as api from "./api";

export const USER_SIGN_IN = "USER_SIGN_IN";
export const USER_SIGN_UP = "USER_SIGN_UP";
export const USER_SIGN_OUT = "USER_SIGN_OUT";

export const userSignInAction =
  (signInFormData) => async (dispatch, getState) => {
    await api.login(
      {
        username: signInFormData.username,
        password: signInFormData.password,
      },
      (result) => {
        console.log(result);
        dispatch({
          type: USER_SIGN_IN,
          userId: result.username,
          fullName: result.username,
          isUserSignedIn: result.success,
        });
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
        console.log(result);
        dispatch({
          type: USER_SIGN_UP,
          userId: result.username,
          fullName: result.username,
          isUserSignedIn: result.success,
        });
      },
      (e) => console.log(e)
    );
  };

export const userSignOutAction = () => async (dispatch, getState) => {
  await api.signout().then((result) => {
    dispatch({
      type: USER_SIGN_OUT,
      userId: null,
      fullName: null,
      isUserSignedIn: !result.success,
    });
  });
};
