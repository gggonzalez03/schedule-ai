import dummyData from "./dummyData";

export const baseURL = "https://schedule-ai.herokuapp.com/api/v1/"

// export function login(userLogin, onSuccess, onError) {
//   try {
//     fetch(baseURL + "get-login-info", {
//       method: "GET",
//       body: JSON.stringify(userLogin)
//     }).then((data) =>
//       data.json()
//       .then((res) => {
//         if (res != undefined) {
//           onSuccess(res)
//         } else {
//           onError(res)
//         }
//       })
//       .catch(e => onError(e))
//     );
//   } catch (err) {
//       onError(err)
//   }
// }

export function login(userLogin, onSuccess, onError) {
  try {
    fetch(baseURL + "get-login-info", {
      method: "GET",
      // body: JSON.stringify(userLogin),
    }).then((data) => {
      data.json().then((res) => {
        if (res != undefined) {
          onSuccess(res)
        } else {
          onError(res)
        }
      })
      .catch(e => { console.log(e)} )
    });
  } catch (err) {
      onError(err)
  }
}

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
};

export const fetchTasks = () => {
  return new Promise((resolve) =>
    setTimeout(() => {
      resolve({
        allTasks: dummyData.taskview.allTasks,
        allPendingTasks: dummyData.taskview.allPendingTasks,
        allPendingTasksCount: dummyData.taskview.allPendingTasksCount,
        dueThisWeekCount: dummyData.taskview.dashboard.dueThisWeekCount,
        todoASAPCount: dummyData.taskview.dashboard.todoASAPCount,
        completedTasksCount: dummyData.taskview.dashboard.completedTasksCount,
      });
    }, 1000)
  );
};

let count = 0;
export const incrementCount = () => {
  return new Promise((resolve) =>
    setTimeout(() => {
      resolve(++count);
    }, 1000)
  );
};
