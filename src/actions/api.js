import dummyData from "./dummyData";

export const baseURL = "https://schedule-ai.herokuapp.com/api/v1/";

function sendXHRRequest(method, endpoint, data, onSuccess, onError) {
  var xhr = new XMLHttpRequest();

  xhr.open(method, baseURL + endpoint);
  xhr.setRequestHeader("Accept", "application/json");
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.setRequestHeader("Access-Control-Allow-Origin", "*");
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4) {
      onSuccess(JSON.parse(xhr.responseText));
    }
  };

  if (data == null) {
    xhr.send();
  } else {
    var data_string = JSON.stringify(data);
    xhr.send(data_string);
  }
}

export function login(userLogin, onSuccess, onError) {
  sendXHRRequest("POST", "login", userLogin, onSuccess, onError);
}

export function signUp(userSignUp, onSuccess, onError) {
  sendXHRRequest("POST", "signup", userSignUp, onSuccess, onError);
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
