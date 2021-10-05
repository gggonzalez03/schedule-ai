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
  },
};

export default store;