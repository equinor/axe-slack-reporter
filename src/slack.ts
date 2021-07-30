import * as E from 'fp-ts/lib/Either'
import * as TE from 'fp-ts/lib/TaskEither'
import * as RTE from 'fp-ts/lib/ReaderTaskEither'
import { pipe } from 'fp-ts/lib/function'
import { IncomingWebhookResult } from '@slack/webhook'
import { Webhook, Result } from './types'

// TODO: Make super fancy template for Slack body eventually
type FromTemplateType = (numberOfViolations: number, numberOfIncomplete: number) => string
const fromTemplate: FromTemplateType = (numberOfViolations, numberOfIncomplete) =>
  `Number of violations: ${numberOfViolations}\nNumber of incomplete: ${numberOfIncomplete}`

type PrepareMessageType = (axeResult: Result) => string
const prepareMessage: PrepareMessageType = ({ numberOfViolations, numberOfIncomplete }) =>
  fromTemplate(numberOfViolations, numberOfIncomplete)

type PostToSlackType = (message: string) => RTE.ReaderTaskEither<Webhook, Error, IncomingWebhookResult>
const postToSlack: PostToSlackType = (message) => (webhook) => TE.tryCatch(() => webhook.send(message), E.toError)

type PrepareAndSendType = (axeResult: Result) => RTE.ReaderTaskEither<Webhook, Error, string>
const prepareAndSendMessage: PrepareAndSendType = (axeResult) =>
  pipe(
    prepareMessage(axeResult),
    postToSlack,
    RTE.map((result) => result.text),
  )

type MaybeSendType = (
  predicate: (axeResult: Result) => boolean,
) => (axeResult: Result) => RTE.ReaderTaskEither<Webhook, Error, string>
export const maybeSend: MaybeSendType = (predicate) => (axeResult) =>
  predicate(axeResult) ? prepareAndSendMessage(axeResult) : RTE.of('Nothing to report!')
