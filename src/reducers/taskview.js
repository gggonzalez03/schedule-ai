import store from "./store";
import { TASK_FETCH_TASKS, TASK_FETCH_COMMITMENTS } from "../actions/taskview";

export default function taskview(state = store.taskview, action) {
  switch (action.type) {
    case TASK_FETCH_TASKS:
      return {
        ...state,
        allPendingTasks: action.allPendingTasks,
      };
    case TASK_FETCH_COMMITMENTS:
      return {
        ...state,
        allCommitments: action.allCommitments,
      };
    default:
      return state;
  }
}
