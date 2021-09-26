export const googleSignIn = () => {
  return new Promise((resolve) =>
    setTimeout(() => {
      resolve({
        userId: "helloworld",
        fullName: "Hello World",
        sessionId: "adkrgjnssdjfsd",
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

let count = 0;
export const incrementCount = () => {
  return new Promise((resolve) =>
    setTimeout(() => {
      resolve(++count);
    }, 1000)
  );
};
