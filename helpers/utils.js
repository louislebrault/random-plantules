export const pipe = (...fns) => input => {
  return fns.reduce(
    (acc, fn) => fn(acc),
    input
  );
};

export const pipeAsync = (...fns) => input => pipeAsyncRec(fns, input)

const pipeAsyncRec = async ([fn, ...restFns], input) => {
  const value = await fn(input)

  if (!restFns.length) {
    return value
  }

  return pipeAsyncRec(restFns, value)
}

export const uniq = (a) => Array.from(new Set(a));

export const sortAlphab = (list) =>
  list
    .sort((a, b) => {
      if (a > b) {
        return +1;
      }

      if (a === b) {
        return 0;
      }

      if (a < b) {
        return -1;
      }
    });

export const keepTruthies = (a) => a.filter(Boolean);

export const wait = (timeMs) => new Promise(res => setTimeout(res, timeMs))

export const equals = (a, b) =>
  Array.isArray(a) &&
  Array.isArray(b) &&
  a.length === b.length &&
  a.every((v, i) => v === b[i]);

export const splitNames = names => names.split(';')
export const takeRandomItem = a => a[Math.floor(Math.random() * a.length)]

export const assert = (actual, expected) => {
  if (actual !== expected) {
    console.log('actual', actual)
    console.log('expected', expected)
    throw new Error(`Assertion failed. Actual: ${actual}, Expected: ${expected}`);
  }

  return true
}
