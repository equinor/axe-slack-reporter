import test from 'tape'
import { send } from './slack'
import * as O from 'fp-ts/Option'
import { Result } from './types'

const urlOk = O.some('http://example.com')
const urlFail = O.none

const exampleResult = {} as Result

test('Valid url gives success code', (t) => {
  t.equals(send(urlOk, exampleResult), 0)
  t.end()
})

test('Non-existent url gives failure code', (t) => {
  t.equals(send(urlFail, exampleResult), 1)
  t.end()
})