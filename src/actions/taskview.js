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

  let startD = new Date(start.toDateString())
  let endD = new Date(end.toDateString())

  var one_day = 1000 * 60 * 60 * 24;
  return parseInt((Math.abs(endD.getTime() - startD.getTime()) / one_day));
};

export const fetchTasksAction = (username) => async (dispatch) => {
  await api.fetchTasks(
    { username: username },
    (result) => {
      let dueTodayCount = 0;
      let dueTomorrowCount = 0;
      let dueThisWeekCount = 0;

      if (result == null || result == undefined || result.length <= 0) {
        let today = new Date();
        let pendingTasksGroupedByScheduleDate = new Array(7)
          .fill()
          .map((_, i) => {
            let dateString = today.toDateString();
            today.setDate(today.getDate() + 1);
            return {
              date: dateString,
              tasks: [],
            };
          });

        dispatch({
          type: TASK_FETCH_TASKS,
          allPendingTasks: pendingTasksGroupedByScheduleDate,
          dueThisWeekCount: dueThisWeekCount,
          dueTodayCount: dueTodayCount,
          dueTomorrowCount: dueTomorrowCount,
        });

        return;
      }

      let current_day = new Date();

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

      // let firstTaskDay = convertRawToJSDate(pendingTasks[0].scheduleDateTime);
      let firstTaskDay = current_day;
      let lastTaskDay = new Date();
      lastTaskDay.setDate(lastTaskDay.getDate() + 6);

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
          daysBeforeDue = daysBeforeDue < 0 ? 0 : daysBeforeDue;
          let daysBeforeStart = getDiffInDays(
            firstTaskDay,
            scheduleDateTimeStart
          );
          daysBeforeStart = daysBeforeStart < 0 ? 0 : daysBeforeStart;
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
    let current_day = new Date();
    let allPendingTasksClone = JSON.parse(
      JSON.stringify(store.getState().taskview.allPendingTasks)
    );

    let taskDueDate = new Date(newTask.dueDate);
    let sections = [];
    console.log(allPendingTasksClone);
    Object.keys(allPendingTasksClone).map((key, index) => {
      let currSection = allPendingTasksClone[key];
      let currDate = new Date(currSection.date);
      if (taskDueDate >= currDate) {
        var currSectionEndTime = 8; // Always start at 8AM
        var totalETC = currSection.tasks.reduce(
          (sum, task) => sum + task.estimatedTimeOfCompletion,
          0
        );
        sections.push({
          taskSectionId: key,
          scheduleDate: currSection.date,
          taskCount: currSection.tasks.length,
          totalETC: totalETC,
          freeStartTime: parseInt(currSectionEndTime) + parseInt(totalETC),
        });
      }
    });

    sections.sort((a, b) => {
      if (a.totalETC === b.totalETC) {
        return b.taskSectionId - a.taskSectionId;
      }
      return b.totalETC > a.totalETC ? 1 : -1;
    });

    let freeSection = sections.pop();
    while (freeSection && freeSection.totalETC >= 8) {
      freeSection = sections.pop();
    }

    console.log(sections, freeSection);

    if (freeSection != undefined) {
      let scheduleDateTime = new Date(freeSection.scheduleDate);
      let dueDateTimeJS = new Date(
        newTask.dueDate + " " + newTask.dueTime + ":00"
      );
      scheduleDateTime.setHours(freeSection.freeStartTime);

      // choose which has less ETC popped vs duedate

      // Required for creating task on the backend
      newTask["username"] = newTask.username;
      newTask["commitmentId"] = newTask.commitmentId;
      newTask["taskName"] = newTask.taskName;
      newTask["status"] = "pending";
      newTask["dueDateTime"] = jsDateToDBDate(dueDateTimeJS);
      newTask["scheduleDateTime"] = jsDateToDBDate(scheduleDateTime);
      newTask["estimatedTimeOfCompletion"] = newTask.estimatedTimeOfCompletion;

      // Additional data for the UI
      newTask["taskSectionId"] = freeSection.taskSectionId;
      newTask["time"] =
        freeSection.freeStartTime +
        ":00-" +
        (parseInt(freeSection.freeStartTime) +
          parseInt(newTask.estimatedTimeOfCompletion)) +
        ":00";

      let dueInXDays = getDiffInDays(current_day, dueDateTimeJS);
      dueInXDays = dueInXDays < 0 ? 0 : dueInXDays;
      newTask["dueInXDays"] = dueInXDays;
      newTask["colorScheme"] =
        store.getState().taskview.allCommitments[
          newTask.commitmentId
        ].colorScheme;

      await api.addTask(
        newTask,
        (result) => {
          newTask["taskId"] = result.taskId;
          dispatch({
            type: TASK_ADD_TASK,
            newTask: newTask,
            dueThisWeekCountAdd: 1,
            dueTodayCountAdd: parseInt(dueInXDays == 0 ? 1 : 0),
            dueTomorrowCountAdd: parseInt(dueInXDays == 1 ? 1 : 0),
          });
        },
        (e) => console.log(e)
      );
    }
  } else {
    let oldTask =
      store.getState().taskview.allPendingTasks[newTask.taskSectionId].tasks[
        newTask.taskIndex
      ];

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
          dueThisWeekCountAdd: -1,
          dueTodayCountAdd: parseInt(task.dueInXDays == 0 ? -1 : 0),
          dueTomorrowCountAdd: parseInt(task.dueInXDays == 1 ? -1 : 0),
        });
      }
    },
    (e) => console.log(e)
  );
};
