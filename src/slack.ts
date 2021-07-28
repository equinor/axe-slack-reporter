import * as O from 'fp-ts/lib/Option'
import * as E from 'fp-ts/lib/Either'
import * as TE from 'fp-ts/lib/TaskEither'
import { pipe } from 'fp-ts/lib/function'
import { IncomingWebhook, IncomingWebhookResult } from '@slack/webhook'
import { Result } from './types'

type FromTemplateType = (numberOfViolations: number, numberOfIncomplete: number) => string
const fromTemplate: FromTemplateType = (numberOfViolations, numberOfIncomplete) =>
  `Number of violations: ${numberOfViolations}\nNumber of incomplete: ${numberOfIncomplete}`

type PrepareMessageType = (axeResult: Result) => string
const prepareMessage: PrepareMessageType = ({ numberOfViolations, numberOfIncomplete }) =>
  fromTemplate(numberOfViolations, numberOfIncomplete)

type PostToSlackType = (webhook: IncomingWebhook) => (message: string) => TE.TaskEither<Error, IncomingWebhookResult>
const postToSlack: PostToSlackType = (webhook) => (message) => TE.tryCatch(() => webhook.send(message), E.toError)

type PrepareAndSendType = (axeResult: Result) => (url: string) => TE.TaskEither<Error, string>
const prepareAndSendMessage: PrepareAndSendType = (axeResult) => (url) =>
  pipe(
    prepareMessage(axeResult),
    postToSlack(new IncomingWebhook(url)), // Perhaps use Reader to inject webhook instead
    TE.map((result) => result.text),
  )

type SendType = (url: O.Option<string>) => (axeResult: Result) => TE.TaskEither<Error, string>
export const send: SendType = (url) => (axeResult) =>
  pipe(
    url,
    TE.fromOption(() => new Error('Unable to get hold of a URL')),
    TE.chain(prepareAndSendMessage(axeResult)),
  )
