export const backoff = <T>(fn: () => Promise<T>, delay = 1000): Promise<T> => {
  let currentDelay = delay;
  const retry = async (): Promise<T> => {
    try {
      return await fn();
    } catch (err) {
      await new Promise((resolve) => setTimeout(resolve, currentDelay));
      currentDelay *= 2;
      return retry();
    }
  };
  return retry();
};
