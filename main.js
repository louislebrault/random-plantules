import plantNames from "./plantNames.js";

export const pipe = (...args) => {
  const fns = args.slice(0, args.length - 1);
  const input = args[args.length - 1];

  return fns.reduce(
    (acc, fn) => fn(acc),
    input,
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

const map = cb => a => a.map(cb)

const uniq = (a) => Array.from(new Set(a));

const sortAlphab = (list) =>
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

const keepTruthies = (a) => a.filter(Boolean);

const wait = (timeMs) => new Promise(res => setTimeout(res, timeMs))

const fetchWikipedia = async ([plantName, ...rest]) => {
  const res = await fetch('https://fr.wikipedia.org/wiki/' + plantName)
  const text = await res.text()

  Deno.writeTextFile("plants.json", text)

  await wait(3000)

  if (rest.length) return fetchWikipedia(rest)

  return res
}

const writePlantnamesFile = async names => {
  const stringified = names.join(';')

  await Deno.writeTextFile('clean-plantNames.txt', stringified)

  return stringified
}

export const equals = (a, b) =>
  Array.isArray(a) &&
  Array.isArray(b) &&
  a.length === b.length &&
  a.every((v, i) => v === b[i]);

export const writeCleanPlantNamesFile = (input) =>
  pipe(
    uniq,
    keepTruthies,
    sortAlphab,
    writePlantnamesFile,
    input,
  );

const getNames = () => Deno.readTextFile('./clean-plantNames.txt')
const splitNames = names => names.split(';')
const takeRandomItem = a => a[Math.floor(Math.random() * a.length)]

export const getRandomPlantName = pipeAsync(
  getNames,
  splitNames,
  takeRandomItem
)
console.log('await getRandomPlantName', await getRandomPlantName())
