import store from "../reducers/store";
import * as api from "./api";

export const TASK_FETCH_TASKS = "TASK_FETCH_TASKS";
export const TASK_FETCH_COMMITMENTS = "TASK_FETCH_COMMITMENTS";
export const TASK_SELECT_COMMITMENT = "TASK_SELECT_COMMITMENT";
export const TASK_SELECT_TASK = "TASK_SELECT_TASK";
export const TASK_ADD_TASK_PREPARE = "TASK_ADD_TASK_PREPARE";
export const TASK_ADD_TASK = "TASK_ADD_TASK";
export const TASK_FORM_EDIT_COMMITMENT = "TASK_FORM_EDIT_COMMITMENT";
export const TASK_FORM_EDIT_TASK_NAME = "TASK_FORM_EDIT_TASK_NAME";
export const TASK_FORM_EDIT_DUE_DATE_TIME = "TASK_FORM_EDIT_DUE_DATE_TIME";
export const TASK_FORM_EDIT_ECT = "TASK_FORM_EDIT_ECT";
export const TASK_FORM_SHOW = "TASK_FORM_SHOW";
export const TASK_FORM_HIDE = "TASK_FORM_HIDE";

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

export const selectTaskAction = (task) => (dispatch) => {
  dispatch({
    type: TASK_SELECT_TASK,
    task: task,
  });
};

export const addTaskPrepareAction = (commitmentName) => (dispatch) => {
  dispatch({
    type: TASK_ADD_TASK_PREPARE,
    commitmentName: commitmentName,
  });
};

export const addTaskAction = (newTask) => (dispatch) => {
  // input
  // newTask: {
  //   taskName: "Homework 1",
  //   commitmentName: "CMPE 181",
  //   dueDateTime: 0,
  //   estimatedTimeOfCompletion: 0,
  // }

  // Call real API here before dispatch. Similar to line 20

  // Use store to modify the new task

  // Also modify task to be this format before dispatch but after API call:
  // newTask: {
  //   taskName: "Homework 5",
  //   commitmentName: "CMPE 195A",
  //   dueInXDays: 4,
  //   estimatedTimeOfCompletion: 0,
  //
  //   colorScheme: "#8FF1AD",
  //   scheduleDateTime: new Date(2021, 10, 2, 13, 0), // year, month, day, hour, minute
  // },

  // today = new Date() + 0;

  console.log("here: ", store);

  // Fill in dummy info for now, this has to be done after API call
  newTask["taskName"] = newTask.taskName;
  newTask["commitmentName"] = newTask.commitmentName;
  newTask["time"] = "3:00PM-4:30PM";
  newTask["estimatedTimeOfCompletion"] = newTask.estimatedTimeOfCompletion;

  newTask["dueInXDays"] = 5;
  newTask["scheduledInXDays"] = 1;
  newTask["colorScheme"] = "#8FF1AD";

  dispatch({
    type: TASK_ADD_TASK,
    newTask: newTask,
  });
};

export const taskFormEditCommitmentAction = (formInput) => (dispatch) => {
  dispatch({ type: TASK_FORM_EDIT_COMMITMENT, commitmentName: formInput });
};

export const taskFormEditTaskNameAction = (formInput) => (dispatch) => {
  dispatch({ type: TASK_FORM_EDIT_TASK_NAME, taskName: formInput });
};

export const taskFormEditDueDateTimeAction = (formInput) => (dispatch) => {
  dispatch({ type: TASK_FORM_EDIT_DUE_DATE_TIME, dueDateTime: formInput });
};

export const taskFormEditECTAction = (formInput) => (dispatch) => {
  dispatch({ type: TASK_FORM_EDIT_ECT, estimatedTimeOfCompletion: formInput });
};

export const taskEditFormShowAction = (taskData) => (dispatch) => {
  dispatch({
    type: TASK_FORM_SHOW,
    taskName: taskData.taskName,
    commitmentName: taskData.commitmentName,
    dueDateTime: taskData.dueDateTime,
    estimatedTimeOfCompletion: taskData.estimatedTimeOfCompletion,
  });
};
export const taskEditFormHideAction = () => (dispatch) => {
  dispatch({
    type: TASK_FORM_HIDE,
  });
};
