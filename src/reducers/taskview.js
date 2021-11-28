import store from "./store";
import {
  TASK_FETCH_TASKS,
  TASK_FETCH_COMMITMENTS,
  TASK_SELECT_COMMITMENT,
  TASK_SELECT_TASK,
  TASK_ADD_TASK_PREPARE,
  TASK_ADD_TASK,
  TASK_FORM_EDIT_COMMITMENT,
  TASK_FORM_EDIT_TASK_NAME,
  TASK_FORM_EDIT_DUE_DATE_TIME,
  TASK_FORM_EDIT_ECT,
  TASK_FORM_SHOW,
  TASK_FORM_HIDE,
} from "../actions/taskview";

// export const addTaskAction = () => async (dispatch) => {
//   await api.fetchCommitments().then((result) => {
//     dispatch({
//       type: TASK_FETCH_COMMITMENTS,
//       allCommitments: result.allCommitments,
//     });
//   });
// };

export default function taskview(state = store.taskview, action) {
  switch (action.type) {
    case TASK_FETCH_TASKS:
      return {
        ...state,
        allPendingTasks: action.allPendingTasks,
        allPendingTasksCount: action.allPendingTasksCount,
        dashboard: {
          dueThisWeekCount: action.dueThisWeekCount,
          todoASAPCount: action.todoASAPCount,
          completedTasksCount: action.completedTasksCount,
        },
      };
    case TASK_FETCH_COMMITMENTS:
      return {
        ...state,
        allCommitments: action.allCommitments,
      };
    case TASK_SELECT_COMMITMENT:
      return {
        ...state,
        selectedCommitment: action.selectedCommitment,
      };
    case TASK_SELECT_TASK:
      return {
        ...state,
        selectedTask: action.task,
      };
    case TASK_ADD_TASK_PREPARE:
      return {
        ...state,
        commitmentNameToAddTaskTo: action.commitmentName,
      };
    case TASK_ADD_TASK:
      // Get input
      // Run algo
      // addTaskAction (call API to post to DB)

      state.allPendingTasks[action.newTask.scheduledInXDays].tasks = [
        ...state.allPendingTasks[action.newTask.scheduledInXDays].tasks,
        action.newTask,
      ];

      return {
        ...state,
        allPendingTasks: [...state.allPendingTasks],
      };
    case TASK_FORM_EDIT_COMMITMENT:
      return {
        ...state,
        taskEditContent: {
          ...state.taskEditContent,
          commitmentName: action.commitmentName,
          commitmentId: action.commitmentId,
        },
      };
    case TASK_FORM_EDIT_TASK_NAME:
      return {
        ...state,
        taskEditContent: {
          ...state.taskEditContent,
          taskName: action.taskName,
        },
      };
    case TASK_FORM_EDIT_DUE_DATE_TIME:
      return {
        ...state,
        taskEditContent: {
          ...state.taskEditContent,
          dueDateTime: action.dueDateTime,
        },
      };
    case TASK_FORM_EDIT_ECT:
      return {
        ...state,
        taskEditContent: {
          ...state.taskEditContent,
          estimatedTimeOfCompletion: action.estimatedTimeOfCompletion,
        },
      };
    case TASK_FORM_SHOW:
      return {
        ...state,
        taskEditFormVisible: true,
        taskEditContent: {
          ...state.taskEditContent,
          taskId: action.taskId,
          taskSectionId: action.taskSectionId,
          taskIndex: action.taskIndex,
          taskName: action.taskName,
          commitmentId: action.commitmentId,
          commitmentName: action.commitmentName,
          dueDateTime: action.dueDateTime,
          estimatedTimeOfCompletion: action.estimatedTimeOfCompletion,
        },
      };
    case TASK_FORM_HIDE:
      return {
        ...state,
        taskEditFormVisible: false,
      };
    default:
      return state;
  }
}
