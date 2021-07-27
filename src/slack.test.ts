import test from 'tape'
import { send } from './slack'

test('Accepts undefined input', (t) => {
  t.assert(send(undefined))
  t.end()
})

test('Accepts null input', (t) => {
  t.assert(send(null))
  t.end()
})

test('Gives error code in response if not proper string', (t) => {
  t.equals(send(undefined), 1)
  t.end()
})

test('Gives success code in response if proper string', (t) => {
  t.equals(send('someUrl'), 0)
  t.end()
})