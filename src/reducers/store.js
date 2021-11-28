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
      dueDate: new Date().toDateString(),
      dueTime: "00:00",
      estimatedTimeOfCompletion: null,
      startDateTime: null,
      endDateTime: null,
    },
    commitmentEditContent: {
      commitmentName: null,
    },
    taskEditFormVisible: false,
    commitmentEditFormVisible: false,
  },
};

export default store;