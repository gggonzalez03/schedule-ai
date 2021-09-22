let count = 0;
export const incrementCount = () => {
  return new Promise(resolve =>
    setTimeout(() => {
      resolve(++count);
    }, 1000)
  );
};