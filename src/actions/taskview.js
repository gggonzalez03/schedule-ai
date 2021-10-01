import * as api from "./api";

export const TASK_FETCH_TASKS = "TASK_FETCH_TASKS";
export const TASK_FETCH_COMMITMENTS = "TASK_FETCH_COMMITMENTS";

export const fetchCommitmentsAction = () => async (dispatch, getState) => {
  await api.fetchCommitments().then((result) => {
    dispatch({
      type: TASK_FETCH_COMMITMENTS,
      allCommitments: result.allCommitments,
    });
  });
};

export const fetchTasksAction = () => async (dispatch, getState) => {
  await api.fetchTasks().then((result) => {
    dispatch({
      type: TASK_FETCH_TASKS,
      allPendingTasks: result.allPendingTasks,
    });
  });
};
