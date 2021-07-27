import test from 'tape'
import { compose } from './fp-funcs'

test('Can compose one function', (t) => {
  const NUMBER = 1
  const func = compose(() => NUMBER)
  const res = func()
  t.equals(res, NUMBER, 'Function executes as expected')
  t.end()
})

test('Can compose two functions', (t) => {
  const NUMBER = 1
  const NUMBER2 = 2
  const func1 = () => NUMBER
  const func2 = (n: number) => n + NUMBER2
  const composedFunc = compose(func2, func1)
  const res = composedFunc()
  t.equals(res, NUMBER + NUMBER2, 'Result from composed function equals som if numbers')
  t.end()
})

test('Can compose two functions with params', (t) => {
  const NUMBER = 1
  const NUMBER2 = 2
  const func1 = (n: number) => n
  const func2 = (n: number) => n + NUMBER2
  const composedFunc = compose(func2, func1)
  const res = composedFunc(NUMBER)
  t.equals(res, NUMBER + NUMBER2, 'Result from composed function equals sum of numbers put in')
  t.end()
})
