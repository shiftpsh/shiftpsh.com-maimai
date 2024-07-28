export const chunkArray = <T>(arr: T[], n: number) => {
  const res: T[][] = [];
  for (let i = 0; i < arr.length; i += n) {
    res.push(arr.slice(i, i + n));
  }
  return res;
};

export const sleep = async (t: number) => {
  return new Promise((resolve) => setTimeout(resolve, t));
};

export const batchedPromiseAll = async <T>(
  promises: (() => Promise<T>)[],
  args?: {
    batchSize?: number;
    interval?: number;
  }
): Promise<T[]> => {
  const { batchSize = 2, interval = 500 } = args || {};

  const res: T[] = [];
  const chunked = chunkArray(promises, batchSize);
  for (const chunk of chunked) {
    const results = await Promise.all(chunk.map((p) => p()));
    res.push(...results);
    await sleep(interval);
  }

  return res;
};
