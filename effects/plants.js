export const getNames = () => Deno.readTextFile('./data/plant-names.txt')

export const writePlantNamesFile = async names => {
  const stringified = names.join(';')

  await Deno.writeTextFile('./data/plant-names.txt', stringified)

  return stringified
}

