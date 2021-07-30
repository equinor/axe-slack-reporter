import test from 'tape'
import { maybeSend } from './slack'
import * as T from 'fp-ts/Task'
import * as E from 'fp-ts/Either'
import { Result } from './types'
import { IncomingWebhookResult } from '@slack/webhook'

const exampleResult = { numberOfIncomplete: 1, numberOfViolations: 2 } as Result

const mockWebhook = (text: string) => ({
  send: () => Promise.resolve({ text } as IncomingWebhookResult),
})

test('Do not report to slack if nothing is found', async (t) => {
  const res = maybeSend(() => false)(exampleResult)(mockWebhook(''))
  await T.map(E.fold(t.notOk, (res: string) => (res === 'Nothing to report!' ? t.ok(res) : t.notOk(res))))(res)()
  t.end()
})

test('Report to slack if something is found', async (t) => {
  const res = maybeSend(() => true)(exampleResult)(mockWebhook('called'))
  await T.map(E.fold(t.notOk, (res: string) => (res && res === 'called' ? t.ok(res) : t.notOk(res))))(res)()
  t.end()
})
