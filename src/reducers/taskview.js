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
  TASK_FORM_EDIT_DUE_DATE,
  TASK_FORM_EDIT_ECT,
  TASK_FORM_SHOW,
  TASK_FORM_HIDE,
  COMMITMENT_FORM_EDIT_COMMITMENT,
  COMMITMENT_FORM_SUBMIT,
  COMMITMENT_FORM_SHOW,
  COMMITMENT_FORM_HIDE,
  TASK_CLOSE_TASK,
  TASK_FORM_EDIT_DUE_TIME,
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
          dueTodayCount: action.dueTodayCount,
          dueTomorrowCount: action.dueTomorrowCount,
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

      state.allPendingTasks[action.newTask.taskSectionId].tasks = [
        ...state.allPendingTasks[action.newTask.taskSectionId].tasks,
        action.newTask,
      ];

      let allCommitmentsClone = JSON.parse(
        JSON.stringify(state.allCommitments)
      );

      allCommitmentsClone[action.newTask.commitmentId].taskCount++;

      return {
        ...state,
        allPendingTasks: [...state.allPendingTasks],
        taskEditFormVisible: false,
        allCommitments: { ...allCommitmentsClone },
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
    case TASK_FORM_EDIT_DUE_DATE:
      return {
        ...state,
        taskEditContent: {
          ...state.taskEditContent,
          dueDate: action.dueDate,
        },
      };
    case TASK_FORM_EDIT_DUE_TIME:
      return {
        ...state,
        taskEditContent: {
          ...state.taskEditContent,
          dueTime: action.dueTime,
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
        commitmentEditFormVisible: false,
        taskEditContent: {
          ...state.taskEditContent,
          taskId: action.taskId,
          taskSectionId: action.taskSectionId,
          taskIndex: action.taskIndex,
          taskName: action.taskName,
          commitmentId: action.commitmentId,
          commitmentName: action.commitmentName,
          dueDate: action.dueDate,
          dueTime: action.dueTime,
          estimatedTimeOfCompletion: action.estimatedTimeOfCompletion,
        },
      };
    case TASK_FORM_HIDE:
      return {
        ...state,
        taskEditFormVisible: false,
      };

    case COMMITMENT_FORM_EDIT_COMMITMENT:
      return {
        ...state,
        commitmentEditContent: {
          commitmentName: action.commitmentName,
        },
      };
    case COMMITMENT_FORM_SUBMIT:
      return {
        ...state,
        allCommitments: {
          ...state.allCommitments,
          [action.commitmentId]: {
            commitmentName: action.commitmentName,
            commitmentId: action.commitmentId,
            colorScheme: action.colorScheme,
            taskCount: 0,
          },
        },
        commitmentEditFormVisible: false,
      };
    case COMMITMENT_FORM_SHOW:
      return {
        ...state,
        commitmentEditFormVisible: true,
        taskEditFormVisible: false,
        commitmentEditContent: {
          commitmentName: action.commitmentName,
        },
      };
    case COMMITMENT_FORM_HIDE:
      return {
        ...state,
        commitmentEditFormVisible: false,
      };
    case TASK_CLOSE_TASK:
      // console.log(
      //   state.allPendingTasks,
      //   action.taskSectionId,
      //   action.taskIndex
      // );

      let allPendingTasksClone = JSON.parse(
        JSON.stringify(state.allPendingTasks)
      );

      allPendingTasksClone[action.taskSectionId].tasks.splice(
        action.taskIndex,
        1
      );

      return {
        ...state,
        allPendingTasks: [...allPendingTasksClone],
      };

    default:
      return state;
  }
}
