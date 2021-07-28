import * as O from 'fp-ts/lib/Option'
import * as E from 'fp-ts/lib/Either'
import * as TE from 'fp-ts/lib/TaskEither'
import * as RTE from 'fp-ts/lib/ReaderTaskEither'
import { pipe } from 'fp-ts/lib/function'
import { IncomingWebhook, IncomingWebhookResult } from '@slack/webhook'
import { Result } from './types'

// TODO: Make super fancy template for Slack body eventually
type FromTemplateType = (numberOfViolations: number, numberOfIncomplete: number) => string
const fromTemplate: FromTemplateType = (numberOfViolations, numberOfIncomplete) =>
  `Number of violations: ${numberOfViolations}\nNumber of incomplete: ${numberOfIncomplete}`

type PrepareMessageType = (axeResult: Result) => string
const prepareMessage: PrepareMessageType = ({ numberOfViolations, numberOfIncomplete }) =>
  fromTemplate(numberOfViolations, numberOfIncomplete)

type PostToSlackType = (message: string) => RTE.ReaderTaskEither<IncomingWebhook, Error, IncomingWebhookResult>
const postToSlack: PostToSlackType = (message) => (webhook) => TE.tryCatch(() => webhook.send(message), E.toError)

type PrepareAndSendType = (axeResult: Result) => (url: string) => TE.TaskEither<Error, string>
const prepareAndSendMessage: PrepareAndSendType = (axeResult) => (url) =>
  pipe(
    prepareMessage(axeResult),
    postToSlack,
    RTE.map((result) => result.text),
  )(new IncomingWebhook(url))

type SendType = (url: O.Option<string>) => (axeResult: Result) => TE.TaskEither<Error, string>
export const send: SendType = (url) => (axeResult) =>
  pipe(
    url,
    TE.fromOption(() => new Error('Unable to get hold of a URL')),
    TE.chain(prepareAndSendMessage(axeResult)),
  )
