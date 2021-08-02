import plantNames from './plantNames.js'

export const pipe = (...args) => {
  const fns = args.slice(0, args.length - 1)
  const input = args[args.length - 1]

  return fns.reduce(
    (acc, fn) => fn(acc)
    , input
  )
}
const uniq = a => Array.from(new Set(a))
const sortAlphab = list => list
  .sort((a, b) => {
    if (a > b)
      return + 1

    if (a === b)
      return 0

    if (a < b)
      return -1
})
const keepTruthies = a => a.filter(Boolean)
export const equals = (a, b) =>
  Array.isArray(a) &&
  Array.isArray(b) &&
  a.length === b.length &&
  a.every((v, i) => v === b[i])

const main = input => pipe(
  uniq,
  keepTruthies,
  sortAlphab,
  input
)

export default main

const result = main(plantNames)
console.log('result', result)
