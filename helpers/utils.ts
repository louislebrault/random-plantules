type pipe = (...fns: Array<unknown>) => (input: unknown) => unknown
export const pipe:pipe = (...fns) => input => {
  return fns.reduce(
    (acc, fn) => typeof fn === 'function' ? fn(acc) : fn,
    input
  );
};

type pipeAsync = (...fns: Array<unknown>) => (input: unknown) => any
export const pipeAsync:pipeAsync =
  (...fns) =>
  input =>
  pipeAsyncRec(fns, input)

type pipeAsyncRec = (fns: Array<unknown>, input: unknown) => unknown
const pipeAsyncRec:pipeAsyncRec = async ([fn, ...restFns], input) => {
  if (typeof fn !== 'function') return

  const value = await fn(input)

  if (!restFns.length) {
    return value
  }

  return pipeAsyncRec(restFns, value)
}


type sortAlphab = (a: Array<string>) => Array<string>
export const sortAlphab:sortAlphab = (list) =>
  list
    .sort((a, b) => {
      if (a > b) {
        return +1;
      }

      if (a === b) {
        return 0;
      }

      return -1;
    });

type keepTruthies = (a: Array<unknown>) => Array<unknown>
export const keepTruthies:keepTruthies = (a) => a.filter(Boolean);

type wait = (timeMs: number) => Promise<void>
export const wait:wait = (timeMs) => new Promise(res => setTimeout(res, timeMs))

type equals = (a: Array<unknown>, b:Array<unknown>) => boolean
export const equals:equals = (a, b) =>
  Array.isArray(a) &&
  Array.isArray(b) &&
  a.length === b.length &&
  a.every((v, i) => v === b[i]);

type splitNames = (a: string) => Array<string>
export const splitNames:splitNames = names => names.split(';')

type takeRandomItem = (a: Array<unknown>) => unknown
export const takeRandomItem: takeRandomItem = a => a[Math.floor(Math.random() * a.length)]

type assert = (a: unknown, b: unknown) => boolean
export const assert:assert = (actual, expected) => {
  if (actual !== expected) {
    console.log('actual', actual)
    console.log('expected', expected)
    throw new Error(`Assertion failed. Actual: ${actual}, Expected: ${expected}`);
  }

  return true
}

type uniq = (a: Array<unknown>) => Array<unknown>
export const uniq:uniq = (a) => Array.from(new Set(a));

type joinNames = (names: Array<string>) => string
export const joinNames: joinNames = names => names.join(';')
