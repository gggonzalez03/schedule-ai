import store from "./store";
import {
  TASK_FETCH_TASKS,
  TASK_FETCH_COMMITMENTS,
  TASK_SELECT_COMMITMENT,
} from "../actions/taskview";

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
    default:
      return state;
  }
}
