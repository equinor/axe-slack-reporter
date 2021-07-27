import { none, some, match, fromNullable } from 'fp-ts/lib/Option'
import { pipe, flow } from 'fp-ts/lib/function'
import { IncomingWebhook } from '@slack/webhook'
import { Result } from './types'

type FromTemplateType = (numberOfViolations: number, numberOfIncomplete: number) => string
const fromTemplate: FromTemplateType = (numberOfViolations, numberOfIncomplete) =>
  `Number of violations: ${numberOfViolations}\nNumber of incomplete: ${numberOfIncomplete}`

type PrepareMessageType = (axeResult: Result) => string
const prepareMessage: PrepareMessageType = (axeResult) =>
  fromTemplate(axeResult.numberOfViolations, axeResult.numberOfIncomplete)

// type SendMessageToSlackType = (url: string, axeResult: Result) => number // TODO: Replace with proper success type
// const sendMessageToSlack: SendMessageToSlackType = (url, axeResult) => flow(
//   connectToSlack(url)
//   prepareMessage(axeResult),
//   sendMessageToSlack
// )

// type SendType = (maybeUrl: (string | undefined), axeResult: Result) => number
// export const send: SendType = (maybeUrl, axeResult) =>
//   pipe(
//     fromNullable(maybeUrl),
//     match(
//       () => 1,
//       (url: string) => sendMessageToSlack(url, axeResult),
//     ),
//   )
// const webhook = new IncomingWebhook(url)
