import test from 'tape'
import { maybeSend } from './slack'
import * as O from 'fp-ts/Option'
import * as T from 'fp-ts/Task'
import * as E from 'fp-ts/Either'
import { IWebhook, Result } from './types'
import {
  IncomingWebhook,
  IncomingWebhookDefaultArguments,
  IncomingWebhookResult,
  IncomingWebhookSendArguments,
} from '@slack/webhook'

const urlOk = O.some('http://example.com')
const urlFail = O.none

const exampleResult = { numberOfIncomplete: 1, numberOfViolations: 2 } as Result

// test('Missing url is reported as error', async (t) => {
//   const res = send(urlFail)(exampleResult)
//   await T.map(E.fold(t.ok, t.notOk))(res)()
//   t.end()
// })

// test('Working url gives success', async (t) => {
//   const res = send(urlOk)(exampleResult)
//   await T.map(E.fold(t.notOk, t.ok))(res)()
//   t.end()
// })

// TODO: Make better tests. Should mock slack api
test('Do not report to slack if nothing is found', async (t) => {
  const res = maybeSend(() => false)(exampleResult)(myFakeWebhook)
  await T.map(E.fold(t.notOk, (res: string) => (res === 'Nothing to report!' ? t.ok(res) : t.notOk(res))))(res)()
  t.end()
})

test('Report to slack if something is found', async (t) => {
  const res = maybeSend(() => true)(exampleResult)(myFakeWebhook)
  await T.map(E.fold(t.notOk, (res: string) => (res && res !== 'Nothing to report!' ? t.ok(res) : t.notOk(res))))(res)()
  t.end()
})

// Make mock from this that can be verifyed
const myFakeWebhook: IWebhook = {
  send: (text: string | IncomingWebhookSendArguments) => {
    console.log(text)
    return Promise.resolve({} as IncomingWebhookResult)
  },
}
