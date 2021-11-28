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
export const TASK_FORM_EDIT_DUE_DATE = "TASK_FORM_EDIT_DUE_DATE";
export const TASK_FORM_EDIT_DUE_TIME = "TASK_FORM_EDIT_DUE_TIME";
export const TASK_FORM_EDIT_ECT = "TASK_FORM_EDIT_ECT";
export const TASK_FORM_SHOW = "TASK_FORM_SHOW";
export const TASK_FORM_HIDE = "TASK_FORM_HIDE";
export const COMMITMENT_FORM_EDIT_COMMITMENT =
  "COMMITMENT_FORM_EDIT_COMMITMENT";
export const COMMITMENT_FORM_SUBMIT = "COMMITMENT_FORM_SUBMIT";
export const COMMITMENT_FORM_SHOW = "COMMITMENT_FORM_SHOW";
export const COMMITMENT_FORM_HIDE = "COMMITMENT_FORM_HIDE";
export const TASK_CLOSE_TASK = "TASK_CLOSE_TASK";
export const TASK_EDIT_TASK = "TASK_EDIT_TASK";

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
  let mm = String(jsDate.getMonth()).padStart(2, "0");
  let yyyy = String(jsDate.getFullYear());
  let hh = String(jsDate.getHours()).padStart(2, "0");
  let min = String(jsDate.getMinutes()).padStart(2, "0");

  return yyyy + mm + dd + hh + min;
};

const jsDateToDBDate = (jsDate) => {
  return fromRawToDb(jsDateToRaw(jsDate));
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
      let dueTodayCount = 0;
      let dueTomorrowCount = 0;
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
        let dueDateTimeRaw = fromDbDateTORaw(task.dueDateTime);
        let dueDateJS = convertRawToJSDate(dueDateTimeRaw);

        let hour =
          dueDateJS.getHours() < 10
            ? "0" + dueDateJS.getHours()
            : dueDateJS.getHours();
        let minute =
          dueDateJS.getMinutes() < 10
            ? "0" + dueDateJS.getMinutes()
            : dueDateJS.getMinutes();

        task.dueDateTime = dueDateTimeRaw;
        task.dueDate = dueDateJS.toDateString();
        task.dueTime = hour + ":" + minute;
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
          if (daysBeforeDue == 0) {
            dueTodayCount++;
          }
          if (daysBeforeDue == 1) {
            dueTomorrowCount++;
          }
        }
      });

      // console.log(pendingTasksGroupedByScheduleDate);
      // console.log(result);

      dispatch({
        type: TASK_FETCH_TASKS,
        allPendingTasksRaw: result,
        allPendingTasks: pendingTasksGroupedByScheduleDate,
        allPendingTasksCount: result.allPendingTasksCount,
        dueThisWeekCount: dueThisWeekCount,
        dueTodayCount: dueTodayCount,
        dueTomorrowCount: dueTomorrowCount,
      });
    },
    (e) => console.log(e)
  );
};

export const selectCommitmentAction = (index) => async (dispatch) => {};

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

export const addTaskAction = (newTask) => async (dispatch) => {
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
    console.log(store.getState().taskview.allPendingTasksRaw);

    // var current_dates_timestamp = [];

    // var target_due_time = newTask.dueDateTime;
    // var target_length = newTask.estimatedTimeOfCompletion;
    // var target_due_time_timestamp = new Date(newTask.dueDateTime).getTime();

    // store.getState().taskview.allPendingTasks.forEach((element) => {
    //   current_dates_timestamp.push(new Date(element.date).getTime());
    // });

    // // Sort the dates array
    // current_dates_timestamp.sort();

    // console.log(target_due_time_timestamp);
    // console.log(current_dates_timestamp);

    // var target_idx = 0;

    // while (
    //   (target_idx < current_dates_timestamp.length) &
    //   (target_due_time_timestamp > current_dates_timestamp[target_idx])
    // ) {
    //   target_idx++;
    // }

    // console.log(target_idx);
  } else {
    console.log("The task should only be edited");
    console.log("Task ID is: ", newTask.taskId);
    console.log("Section ID is: ", newTask.taskSectionId);
    console.log("Task Index is: ", newTask.taskIndex);

    let oldTask =
      store.getState().taskview.allPendingTasks[newTask.taskSectionId].tasks[
        newTask.taskIndex
      ];

    console.log(oldTask, newTask);

    if (
      oldTask.dueDate == newTask.dueDate &&
      oldTask.dueTime == newTask.dueTime &&
      oldTask.estimatedTimeOfCompletion == newTask.estimatedTimeOfCompletion
    ) {
      await api.editTask(
        {
          taskId: oldTask.taskId,
          username: oldTask.username,
          commitmentId: newTask.commitmentId,
          taskName: newTask.taskName,
        },
        (result) => {
          dispatch({
            type: TASK_EDIT_TASK,
            newTask: newTask,
          });
        }
      );
    }
  }

  // Ging Prep for Algo
  if (newTask.taskId == undefined && false) {
    // Generate scheduleDateTime using the algo
    console.log("NEW: ", newTask);

    // Required for creating task on the backend
    newTask["status"] = "pending";
    newTask["scheduleDateTime"] = fromRawToDb("202111011400");
    newTask["dueDateTime"] = jsDateToDBDate(
      new Date(newTask.dueDate + " " + newTask.dueTime + ":00")
    );

    // Extras for the UI
    newTask["taskId"] = "From API result";
    newTask["taskSectionId"] = 1;
    // newTask["taskIndex"] = 1;
    newTask["time"] = "14:00-16:00";
    newTask["dueInXDays"] = 5;
    newTask["colorScheme"] =
      store.getState().taskview.allCommitments[
        newTask.commitmentId
      ].colorScheme;

    // await api.addTask(
    //   newTask,
    //   (result) => {
    //     console.log(result)
    //     dispatch({
    //       type: TASK_ADD_TASK,
    //       newTask: newTask,
    //     });
    //   },
    //   (e) => console.log(e)
    // );
  }
};

export const commitmentFormEditCommitmentAction =
  (commitmentName) => (dispatch) => {
    dispatch({
      type: COMMITMENT_FORM_EDIT_COMMITMENT,
      commitmentName: commitmentName,
    });
  };

export const commitmentFormSubmitAction = (formInput) => async (dispatch) => {
  await api.addCommitment(
    formInput,
    (result) => {
      console.log(result);
      dispatch({
        type: COMMITMENT_FORM_SUBMIT,
        commitmentName: result.commitmentName,
        commitmentId: result.commitmentId,
        colorScheme: result.colorScheme,
      });
    },
    (e) => console.log(e)
  );
};

export const commitmentFormShowAction = (taskData) => (dispatch) => {
  dispatch({
    type: COMMITMENT_FORM_SHOW,
    commitmentName: "",
  });
};

export const commitmentFormHideAction = () => (dispatch) => {
  dispatch({
    type: COMMITMENT_FORM_HIDE,
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

export const taskFormEditDueDateAction = (formInput) => (dispatch) => {
  dispatch({ type: TASK_FORM_EDIT_DUE_DATE, dueDate: formInput });
};

export const taskFormEditDueTimeAction = (formInput) => (dispatch) => {
  dispatch({ type: TASK_FORM_EDIT_DUE_TIME, dueTime: formInput });
};

export const taskFormEditECTAction = (formInput) => (dispatch) => {
  dispatch({ type: TASK_FORM_EDIT_ECT, estimatedTimeOfCompletion: formInput });
};

export const taskEditFormShowAction = (taskData) => (dispatch) => {
  let disableFormPart = taskData.taskId == undefined ? false : true;
  dispatch({
    type: TASK_FORM_SHOW,
    ...taskData,
    taskEditFormPartDisabled: disableFormPart,
  });
};

export const taskEditFormHideAction = () => (dispatch) => {
  dispatch({
    type: TASK_FORM_HIDE,
  });
};

export const closeTaskAction = (task) => async (dispatch) => {
  await api.closeTask(
    { taskId: task.taskId },
    (result) => {
      if (result.success) {
        dispatch({
          type: TASK_CLOSE_TASK,
          ...task,
        });
      }
    },
    (e) => console.log(e)
  );
};
