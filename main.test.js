import { equals, pipe, pipeAsync } from "./main.js";

Deno.test('pipeAsync : pipe functions passed as parameter', async () => {
  const fn1 = a => a - 5
  const fn2 = a => a * 2

  const actual = await pipeAsync(fn1, fn2)(20)
  const expected = 30

  if (actual !== expected) {
    console.log('actual', actual)
    console.log('expected', expected)
    throw new Error();
  }
})
