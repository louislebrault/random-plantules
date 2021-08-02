import main, { pipe, equals } from './main.js'

Deno.test("first test", () => {
  const plantNames = [ "Sapin blanc", "Sapin de Vancouver", "Abutilon d'Avicenne", "Mimosa argenté" ]

  const actual = main(plantNames)
  const expected = [ "Abutilon d'Avicenne", "Mimosa argenté", "Sapin blanc", "Sapin de Vancouver" ]

  if (!equals(actual, expected)) {
    console.log('actual', actual)
    console.log('expected', expected)

    throw new Error()
  }
})
