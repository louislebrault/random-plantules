type getNames = () => Promise<string>
export const getNames: getNames = () => Deno.readTextFile('./data/plant-names.txt')

type writePlantNamesFile = (names: string) => Promise<void>
export const writePlantNamesFile: writePlantNamesFile =
  names =>
  Deno.writeTextFile('./data/plant-names.txt', names)

