import store from "../reducers/index";
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

const fromDbDateTORaw = (dbToRaw) => {
  if (dbToRaw != null) {
    let month = parseInt(dbToRaw.slice(5, 7)) - 1;
    return (
      "" +
      dbToRaw.slice(0, 4) +
      (month < 10 ? "0" : "") +
      month +
      dbToRaw.slice(8, 10) +
      dbToRaw.slice(11, 13) +
      dbToRaw.slice(14, 16)
    );
  }
};

const fromRawToDb = (rawToDb) => {
  if (rawToDb != null) {
    let month = parseInt(rawToDb.slice(4, 6)) + 1;
    return (
      "" +
      rawToDb.slice(0, 4) +
      "-" +
      (month < 10 ? "0" : "") +
      month +
      "-" +
      rawToDb.slice(6, 8) +
      " " +
      rawToDb.slice(8, 10) +
      ":" +
      rawToDb.slice(10, 12) +
      ":00"
    );
  }
};

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

export const fetchCommitmentsAction = (username) => async (dispatch) => {
  await api.fetchCommitments(
    { username: username },
    (result) => {
      let allCommitments = null;

      if (result == undefined || result == null) result = [];

      allCommitments = Object.assign(
        {},
        ...result.map((x) => ({ [x.commitmentId]: x }))
      );

      dispatch({
        type: TASK_FETCH_COMMITMENTS,
        allCommitments: allCommitments != null ? allCommitments : [],
      });
    },
    (e) => console.log(e)
  );
};

export const getDiffInDays = (start, end) => {
  var one_day = 1000 * 60 * 60 * 24;
  return Math.round((end.getTime() - start.getTime()) / one_day);
};

export const fetchTasksAction = (username) => async (dispatch) => {
  await api.fetchTasks(
    { username: username },
    (result) => {
      if (result == null || result == undefined || result.length <= 0) return;

      let current_day = new Date();
      let todoASAPCount = 0;
      let completedTasksCount = 0;
      let dueThisWeekCount = 0;

      let pendingTasks = [];
      let allCommitments = store.getState().taskview.allCommitments;

      if (
        allCommitments == null ||
        allCommitments == undefined ||
        allCommitments == []
      )
        return;

      Object.keys(allCommitments).map((c) => {
        allCommitments[c]["taskCount"] = 0;
      });

      // Format and add necessary data
      result.forEach((task) => {
        task.dueDateTime = fromDbDateTORaw(task.dueDateTime);
        task.scheduleDateTime = fromDbDateTORaw(task.scheduleDateTime);
        task.estimatedTimeOfCompletion = task.estTimeOfCompletion;
        task.commitmentName =
          allCommitments[task.commitmentId.toString()] &&
          allCommitments[task.commitmentId.toString()].commitmentName;
        task.colorScheme =
          allCommitments[task.commitmentId.toString()] &&
          allCommitments[task.commitmentId.toString()].colorScheme;

        if (allCommitments[task.commitmentId.toString()]) {
          allCommitments[task.commitmentId.toString()].taskCount =
            allCommitments[task.commitmentId.toString()] &&
            allCommitments[task.commitmentId.toString()].taskCount + 1;
        }
        pendingTasks.push(task);
      });

      // Sort by task schedule date
      pendingTasks.sort((a, b) => {
        return a.scheduleDateTime - b.scheduleDateTime;
      });

      let firstTaskDay = convertRawToJSDate(pendingTasks[0].scheduleDateTime);
      let lastTaskDay = convertRawToJSDate(
        pendingTasks[pendingTasks.length - 1].scheduleDateTime
      );

      let daysCount = getDiffInDays(firstTaskDay, lastTaskDay);
      let firstTaskDayCopy = new Date(firstTaskDay.getTime());
      let pendingTasksGroupedByScheduleDate = new Array(daysCount + 1)
        .fill()
        .map((_, i) => {
          let dateString = firstTaskDayCopy.toDateString();
          firstTaskDayCopy.setDate(firstTaskDayCopy.getDate() + 1);
          return {
            date: dateString,
            tasks: [],
          };
        });

      pendingTasks.forEach((task) => {
        let dueDateTime = convertRawToJSDate(task.dueDateTime);
        let scheduleDateTimeStart = convertRawToJSDate(task.scheduleDateTime);
        let scheduleDateTimeEnd = convertRawToJSDate(task.scheduleDateTime);
        scheduleDateTimeEnd.setHours(
          scheduleDateTimeEnd.getHours() + task.estimatedTimeOfCompletion
        );

        if (task.status == "pending") {
          let daysBeforeDue = getDiffInDays(current_day, dueDateTime);
          let daysBeforeStart = getDiffInDays(
            firstTaskDay,
            scheduleDateTimeStart
          );
          task["dueInXDays"] = daysBeforeDue;
          task["time"] = getTimeScheduleString(
            scheduleDateTimeStart,
            scheduleDateTimeEnd
          );

          pendingTasksGroupedByScheduleDate[daysBeforeStart]["tasks"].push(
            task
          );

          if (daysBeforeDue < 7) {
            dueThisWeekCount++;
          }
          if (daysBeforeDue < 2) {
            todoASAPCount++;
          }
        } else {
          completedTasksCount++;
        }
      });

      // console.log(pendingTasksGroupedByScheduleDate);

      dispatch({
        type: TASK_FETCH_TASKS,
        allPendingTasks: pendingTasksGroupedByScheduleDate,
        allPendingTasksCount: result.allPendingTasksCount,
        dueThisWeekCount: dueThisWeekCount,
        todoASAPCount: todoASAPCount,
        completedTasksCount: completedTasksCount,
      });
    },
    (e) => console.log(e)
  );
};

export const selectCommitmentAction = (index) => async (dispatch) => {
  await api.login(
    {
      username: "username_vish_7",
      password: "password1",
      repeatPassword: "password",
    },
    (res) => {
      console.log(res);
    },
    (e) => {
      console.log(e);
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
  if (newTask.taskId == undefined) {
    console.log("New task should be added");
    /**
     * TODO: Cindy
     * Run algorithm here
     *
     * Useful Data
     * console.log(store.getState().taskview.allPendingTasks);
     * console.log(newTask);
     * 
     * Notes:
     * 
     * taskId is the unique ID of the task, but we generate this at the backend
     * taskSectionId is the index in allPendingTasks the task should be in
     * taskIndex is the index within an allPendingTasks object the task should be in
     */

    console.log(store.getState().taskview.allPendingTasks);
    console.log(newTask);
    
  } else {
    console.log("The task should only be edited");
    console.log("Task ID is: ", newTask.taskId);
    console.log("Section ID is: ", newTask.taskSectionId);
    console.log("Task Index is: ", newTask.taskIndex);
  }

  // Fill in dummy info for now, this has to be done after API call
  // newTask["taskName"] = newTask.taskName;
  // (newTask["selectedCommitmentIndex"] = newTask.selectedCommitmentIndex),
  //   (newTask["commitmentName"] = newTask.commitmentName);
  // newTask["time"] = "3:00PM-4:30PM";
  // newTask["estimatedTimeOfCompletion"] = newTask.estimatedTimeOfCompletion;

  // newTask["dueInXDays"] = 5;
  // newTask["scheduledInXDays"] = 1;
  // newTask["colorScheme"] = "#8FF1AD";

  // dispatch({
  //   type: TASK_ADD_TASK,
  //   newTask: newTask,
  // });
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
