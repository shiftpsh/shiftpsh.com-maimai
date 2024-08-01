export const throttle = <T extends unknown[], R>(
  fn: (...args: T) => R,
  delay: number
) => {
  let lastTime = 0;
  let lastResult: R | null = null;

  return (...args: T) => {
    const now = Date.now();
    if (lastTime + delay < now) {
      lastTime = now;
      lastResult = fn(...args);
    }

    return lastResult;
  };
};
