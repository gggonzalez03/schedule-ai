import dummyData from "./dummyData";

export const googleSignIn = () => {
  return new Promise((resolve) =>
    setTimeout(() => {
      resolve({
        userId: dummyData.user.userId,
        fullName: dummyData.user.fullName,
        sessionId: dummyData.user.sessionId,
        isUserSignedIn: true,
      });
    }, 1000)
  );
};

export const googleSignOut = () => {
  return new Promise((resolve) =>
    setTimeout(() => {
      resolve({
        success: true,
      });
    }, 1000)
  );
};

export const fetchCommitments = () => {
  return new Promise((resolve) =>
    setTimeout(() => {
      resolve({
        allCommitments: dummyData.taskview.allCommitments,
      });
    }, 1000)
  );
}

export const fetchTasks = () => {
  return new Promise((resolve) =>
    setTimeout(() => {
      resolve({
        allPendingTasks: dummyData.taskview.allPendingTasks,
        allPendingTasksCount: dummyData.taskview.allPendingTasksCount,
      });
    }, 1000)
  );
}

let count = 0;
export const incrementCount = () => {
  return new Promise((resolve) =>
    setTimeout(() => {
      resolve(++count);
    }, 1000)
  );
};
