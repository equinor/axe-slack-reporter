import { none, some, match, fromNullable, Option } from 'fp-ts/lib/Option'
import * as E from 'fp-ts/lib/Either'
import { pipe, flow, identity } from 'fp-ts/lib/function'
import { IncomingWebhook } from '@slack/webhook'
import { Result } from './types'

type FromTemplateType = (numberOfViolations: number, numberOfIncomplete: number) => string
const fromTemplate: FromTemplateType = (numberOfViolations, numberOfIncomplete) =>
  `Number of violations: ${numberOfViolations}\nNumber of incomplete: ${numberOfIncomplete}`

type PrepareMessageType = (axeResult: Result) => string
const prepareMessage: PrepareMessageType = (axeResult) =>
  fromTemplate(axeResult.numberOfViolations, axeResult.numberOfIncomplete)

type SendMessageToSlackType = (axeResult: Result) => (url: string) => number // TODO: Replace with proper success type
const sendMessageToSlack: SendMessageToSlackType = (axeResult) => (url) => 0

type SendType = (url: Option<string>, axeResult: Result) => number
export const send: SendType = (url, axeResult) =>
  pipe(
    url,
    E.fromOption(() => 1),
    E.map(sendMessageToSlack(axeResult)),
    E.fold(identity, identity),
  )

// const webhook = new IncomingWebhook(url)

/*
1. Get data to be sent
2. Put data into template for body payload
3. Connect to webhook using URL
4. Send to webhook
5. Handle errors
6. Give feedback
*/
