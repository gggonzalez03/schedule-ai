import * as api from "./api";

export const TASK_FETCH_TASKS = "TASK_FETCH_TASKS";
export const TASK_FETCH_COMMITMENTS = "TASK_FETCH_COMMITMENTS";
export const TASK_SELECT_COMMITMENT = "TASK_SELECT_COMMITMENT";

export const fetchCommitmentsAction = () => async (dispatch) => {
  await api.fetchCommitments().then((result) => {
    dispatch({
      type: TASK_FETCH_COMMITMENTS,
      allCommitments: result.allCommitments,
    });
  });
};

export const fetchTasksAction = () => async (dispatch) => {
  await api.fetchTasks().then((result) => {
    dispatch({
      type: TASK_FETCH_TASKS,
      allPendingTasks: result.allPendingTasks,
      allPendingTasksCount: result.allPendingTasksCount,
      dueThisWeekCount: result.dueThisWeekCount,
      todoASAPCount: result.todoASAPCount,
      completedTasksCount: result.completedTasksCount,
    });
  });
};

export const selectCommitmentAction = (index) => (dispatch) => {
  dispatch({
    type: TASK_SELECT_COMMITMENT,
    selectedCommitment: index,
  });
};
