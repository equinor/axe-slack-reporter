import test from 'tape'
import { send } from './slack'
import * as O from 'fp-ts/Option'
import * as T from 'fp-ts/Task'
import * as E from 'fp-ts/Either'
import { Result } from './types'

const urlOk = O.some('http://example.com')
const urlFail = O.none

const exampleResult = {} as Result

test('Missing url is reported as error', async (t) => {
  const res = send(urlFail, exampleResult)
  await T.map(E.fold(t.ok, t.notOk))(res)()
  t.end()
})

test('Working url gives success', async (t) => {
  const res = send(urlOk, exampleResult)
  await T.map(E.fold(t.notOk, t.ok))(res)()
  t.end()
})