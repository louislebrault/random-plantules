import plantNames from "./plantNames.js";

// un serveur http qui redirect vers la page wikipedia d'une des plantes de la liste ?

export const pipe = (...args) => {
  const fns = args.slice(0, args.length - 1);
  const input = args[args.length - 1];

  return fns.reduce(
    (acc, fn) => fn(acc),
    input,
  );
};

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

export const getRandomPlantName = async () => {
  const names = await Deno.readTextFile('./clean-plantNames.txt')

  const list = names.split(';')

  const randomIndex = Math.floor(Math.random() * list.length)

  return list[randomIndex]
}
