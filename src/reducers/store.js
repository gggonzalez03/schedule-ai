const store = {
  user: {
    userId: null,
    fullName: null,
    sessionId: null,
    isUserSignedIn: false,
  },
  taskview: {
    allPendingTasksRaw: null,
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
      taskEditFormPartDisabled: false,
    },
    commitmentEditContent: {
      commitmentName: null,
    },
    taskEditFormVisible: false,
    commitmentEditFormVisible: false,
    dashboard: {
      dueThisWeekCount: 0,
      dueTodayCount: 0,
      dueTomorrowCount: 0,
    },
  },
};

export default store;
