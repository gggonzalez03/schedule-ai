const store = {
  user: {
    userId: null,
    fullName: null,
    sessionId: null,
    isUserSignedIn: false,
  },
  taskview: {
    allPendingTasksCount: null,
    allPendingTasks: [],
    selectedCommitment: null,
    allCommitments: [],
    taskEditContent: {
      taskName: null,
      commitmentName: null,
      dueDateTime: null,
      estimatedTimeOfCompletion: null,
      startDateTime: null,
      endDateTime: null,
    },
    taskEditFormVisible: false,
  },
};

export default store;