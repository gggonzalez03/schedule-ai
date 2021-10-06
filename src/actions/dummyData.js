const dummyData = {
  user: {
    userId: "helloworld",
    fullName: "Hello World",
    sessionId: "19283182923912839",
    isUserSignedIn: false,
  },
  taskview: {
    allPendingTasksCount: 5,
    allPendingTasks: [
      {
        date: "Today",
        tasks: [
          {
            taskName: "Homework 1",
            commitmentName: "CMPE 181",
            time: "3:00PM-4:30PM",
            dueInXDays: 0,
            colorScheme: "#E3F18F",
          },
        ],
      },
      {
        date: "Tomorrow",
        tasks: [
          {
            taskName: "Homework 2",
            commitmentName: "CMPE 195A",
            time: "3:00PM-4:30PM",
            dueInXDays: 1,
            colorScheme: "#8FF1AD",
          },
          {
            taskName: "Homework 3",
            commitmentName: "CMPE 195A",
            time: "3:00PM-4:30PM",
            dueInXDays: 1,
            colorScheme: "#8FF1AD",
          },
        ],
      },
      { date: "Friday, October 8", tasks: [] },
      { date: "Saturday, October 9", tasks: [] },
      {
        date: "Sunday, October 10",
        tasks: [
          {
            taskName: "Homework 4",
            commitmentName: "CMPE 181",
            time: "3:00PM-4:30PM",
            dueInXDays: 4,
            colorScheme: "#E3F18F",
          },
          {
            taskName: "Homework 5",
            commitmentName: "CMPE 195A",
            time: "3:00PM-4:30PM",
            dueInXDays: 4,
            colorScheme: "#8FF1AD",
          },
        ],
      },
      { date: "Monday, October 11", tasks: [] },
      { date: "Tuesday, October 12", tasks: [] },
      {
        date: "Sunday, October 10",
        tasks: [
          {
            taskName: "Homework 4",
            commitmentName: "CMPE 181",
            time: "3:00PM-4:30PM",
            dueInXDays: 4,
            colorScheme: "#E3F18F",
          },
          {
            taskName: "Homework 5",
            commitmentName: "CMPE 195A",
            time: "3:00PM-4:30PM",
            dueInXDays: 4,
            colorScheme: "#8FF1AD",
          },
        ],
      },
      {
        date: "Sunday, October 10",
        tasks: [
          {
            taskName: "Homework 4",
            commitmentName: "CMPE 181",
            time: "3:00PM-4:30PM",
            dueInXDays: 4,
            colorScheme: "#E3F18F",
          },
          {
            taskName: "Homework 5",
            commitmentName: "CMPE 195A",
            time: "3:00PM-4:30PM",
            dueInXDays: 4,
            colorScheme: "#8FF1AD",
          },
        ],
      },
      {
        date: "Sunday, October 10",
        tasks: [
          {
            taskName: "Homework 4",
            commitmentName: "CMPE 181",
            time: "3:00PM-4:30PM",
            dueInXDays: 4,
            colorScheme: "#E3F18F",
          },
          {
            taskName: "Homework 5",
            commitmentName: "CMPE 195A",
            time: "3:00PM-4:30PM",
            dueInXDays: 4,
            colorScheme: "#8FF1AD",
          },
        ],
      },
    ],
    selectedCommitment: null, // null will select All
    allCommitments: [
      {
        commitmentName: "CMPE 181",
        recurringStartDateTime: new Date(2021, 10, 2, 13, 0), // year, month, day, hour, minute
        recurringEndDateTime: new Date(2021, 10, 2, 15, 0),
        taskCount: 1,
        colorScheme: "#E3F18F",
        days: ["M", "W", "F"],
      },
      {
        commitmentName: "CMPE 195A",
        recurringStartDateTime: new Date(2021, 10, 2, 13, 0), // year, month, day, hour, minute
        recurringEndDateTime: new Date(2021, 10, 2, 15, 0),
        taskCount: 2,
        colorScheme: "#8FF1AD",
        days: ["T", "Th"],
      },
    ],
    dashboard: {
      dueThisWeekCount: 5,
      todoASAPCount: 3,
      completedTasksCount: 5,
    },
  },
};

export default dummyData;
