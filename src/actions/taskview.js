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

const rawToDateTime = (dateTimeRaw) => {
  if (dateTimeRaw != null)
    return (
      "" +
      dateTimeRaw.slice(0, 4) +
      "/" +
      dateTimeRaw.slice(4, 6) +
      "/" +
      dateTimeRaw.slice(6, 8) +
      ", " +
      dateTimeRaw.slice(8, 10) +
      ":" +
      dateTimeRaw.slice(10, 12)
    );
};

const dateTimeToRaw = (dateTimeFormatted) => {
  if (dateTimeFormatted != null)
    return (
      "" +
      dateTimeFormatted.slice(0, 4) +
      dateTimeFormatted.slice(5, 7) +
      dateTimeFormatted.slice(8, 10) +
      dateTimeFormatted.slice(12, 14) +
      dateTimeFormatted.slice(15, 17)
    );
};

const jsDateToRaw = (jsDate) => {
  let dd = String(jsDate.getDate()).padStart(2, "0");
  let mm = String(jsDate.getMonth() + 1).padStart(2, "0");
  let yyyy = String(jsDate.getFullYear());

  return yyyy + mm + dd;
};

const convertRawToJSDate = (dateTimeRaw) => {
  return new Date(
    dateTimeRaw.slice(0, 4),
    dateTimeRaw.slice(4, 6),
    dateTimeRaw.slice(6, 8),
    dateTimeRaw.slice(8, 10),
    dateTimeRaw.slice(10, 12)
  );
};

const getTimeScheduleString = (start, end) => {
  return "" + start.getHours() + ":00-" + end.getHours() + ":00";
};

export const fetchCommitmentsAction = () => async (dispatch) => {
  await api.fetchCommitments().then((result) => {
    dispatch({
      type: TASK_FETCH_COMMITMENTS,
      allCommitments: result.allCommitments,
    });
  });
};

export const getDiffInDays = (start, end) => {
  let diffInTime = end.getTime() - start.getTime();
  return Math.round(diffInTime / (1000 * 3600 * 24));
}

export const fetchTasksAction = () => async (dispatch) => {
  await api.fetchTasks().then((result) => {
    let current_day = new Date();
    let todoASAPCount = 0;
    let completedTasksCount = 0;
    let dueThisWeekCount = 0;
    let pendingTasks = new Array(7).fill().map((_, i) => {
      let dateString = current_day.toDateString();
      current_day.setDate(current_day.getDate() + 1);
      return {
        date: dateString,
        tasks: [],
      };
    });

    result.allTasks.sort((a, b) => {
      return a.scheduleDateTime - b.scheduleDateTime;
    });

    current_day = new Date();
    result.allTasks.forEach((task) => {
      let dueDateTime = convertRawToJSDate(task.dueDateTime);
      let scheduleDateTimeStart = convertRawToJSDate(task.scheduleDateTime);

      let scheduleDateTimeEnd = convertRawToJSDate(task.scheduleDateTime);
      scheduleDateTimeEnd.setHours(
        scheduleDateTimeEnd.getHours() + task.estimatedTimeOfCompletion
      );

      if (task.status == "pending") {
        let daysBeforeDue = getDiffInDays(current_day, dueDateTime);
        let daysBeforeStart = getDiffInDays(current_day, scheduleDateTimeStart);
        task["dueInXDays"] = daysBeforeDue;
        task["time"] = getTimeScheduleString(
          scheduleDateTimeStart,
          scheduleDateTimeEnd
        );
        pendingTasks[daysBeforeStart]["tasks"].push(task);

        if (daysBeforeDue < 7) {
          dueThisWeekCount++;
        }
        if (daysBeforeDue < 2) {
          todoASAPCount++;
        }
      }
      else {
        completedTasksCount++;
      }
    });

    dispatch({
      type: TASK_FETCH_TASKS,
      allPendingTasks: pendingTasks,
      allPendingTasksCount: result.allPendingTasksCount,
      dueThisWeekCount: dueThisWeekCount,
      todoASAPCount: todoASAPCount,
      completedTasksCount: completedTasksCount,
    });
  });
};

export const selectCommitmentAction = (index) => async (dispatch) => {
  await api.login(
    {
      username: "username",
      password: "password",
    },
    (res) => {
      console.log(res);
    }
  );
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

  // current_day = new Date() + 0;

  // Fill in dummy info for now, this has to be done after API call
  newTask["taskName"] = newTask.taskName;
  (newTask["selectedCommitmentIndex"] = newTask.selectedCommitmentIndex),
    (newTask["commitmentName"] = newTask.commitmentName);
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
  dispatch({
    type: TASK_FORM_EDIT_COMMITMENT,
    commitmentName: formInput.name,
    commitmentId: formInput.id,
  });
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
    ...taskData,
  });
};

export const taskEditFormHideAction = () => (dispatch) => {
  dispatch({
    type: TASK_FORM_HIDE,
  });
};
