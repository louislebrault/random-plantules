import { assert, equals, pipe, pipeAsync } from "./utils.js";

Deno.test('pipeAsync : pipe functions passed as parameter', async () => {
  const fn1 = a => a - 5
  const fn2 = a => a * 2

  const actual = await pipeAsync(fn1, fn2)(20)
  const expected = 30

  assert(actual, expected)
})

Deno.test('pipe : pipe functions passed as parameter', async () => {
  const fn1 = a => a - 5
  const fn2 = a => a * 2

  const actual = pipe(fn1, fn2)(20)
  const expected = 30

  assert(actual, expected)
})
