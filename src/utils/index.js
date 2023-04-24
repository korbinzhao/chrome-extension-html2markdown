export const sleep = async (wait) => {
  return new Promise((resolve) => {
    setTimeout(resolve, wait);
  });
};
