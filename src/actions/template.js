import { incrementCount } from "./api";

export const INCREMENT_COUNT = "INCREMENT_COUNT";

export const incrementCountAction = () => async (dispatch, getState) => {
  const newCount = await incrementCount();
  dispatch({
    type: INCREMENT_COUNT,
    payload: newCount,
  });
};
