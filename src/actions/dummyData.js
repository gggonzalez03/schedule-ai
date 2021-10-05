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
      [
        {
          taskName: "Homework 1 Today",
          commitmentName: "CMPE 181",
          startDateTime: new Date(2021, 10, 2, 13, 0), // year, month, day, hour, minute
          endDateTime: new Date(2021, 10, 2, 15, 0),
          dueDate: new Date(2021, 10, 5, 11, 59),
        },
      ],
      [
        {
          taskName: "Homework 2 Tomorrow",
          commitmentName: "CMPE 195A",
          startDateTime: new Date(2021, 10, 2, 13, 0), // year, month, day, hour, minute
          endDateTime: new Date(2021, 10, 2, 15, 0),
          dueDate: new Date(2021, 10, 5, 11, 59),
        },
        {
          taskName: "Homework 3 Tomorrow",
          commitmentName: "CMPE 195A",
          startDateTime: new Date(2021, 10, 2, 13, 0), // year, month, day, hour, minute
          endDateTime: new Date(2021, 10, 2, 15, 0),
          dueDate: new Date(2021, 10, 5, 11, 59),
        },
      ],
      [],
      [],
      [
        {
          taskName: "Homework 4",
          commitmentName: "CMPE 195A",
          startDateTime: new Date(2021, 10, 2, 13, 0), // year, month, day, hour, minute
          endDateTime: new Date(2021, 10, 2, 15, 0),
          dueDate: new Date(2021, 10, 5, 11, 59),
        },
        {
          taskName: "Homework 5",
          commitmentName: "CMPE 195A",
          startDateTime: new Date(2021, 10, 2, 13, 0), // year, month, day, hour, minute
          endDateTime: new Date(2021, 10, 2, 15, 0),
          dueDate: new Date(2021, 10, 5, 11, 59),
        },
      ],
      [],
      [],
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
  },
};

export default dummyData;
