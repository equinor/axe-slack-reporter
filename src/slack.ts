import * as E from 'fp-ts/lib/Either'
import * as TE from 'fp-ts/lib/TaskEither'
import * as RTE from 'fp-ts/lib/ReaderTaskEither'
import { pipe } from 'fp-ts/lib/function'
import { IncomingWebhookResult } from '@slack/webhook'
import { Webhook, Result } from './types'

// TODO: Make super fancy template for Slack body eventually
// Function responsible for applying a template (that does not exist yet)
type FromTemplateType = (numberOfViolations: number, numberOfIncomplete: number) => string
const fromTemplate: FromTemplateType = (numberOfViolations, numberOfIncomplete) =>
  `Number of violations: ${numberOfViolations}\nNumber of incomplete: ${numberOfIncomplete}`

// Function responsible for preparing message to be sent.
type PrepareMessageType = (axeResult: Result) => string
const prepareMessage: PrepareMessageType = ({ numberOfViolations, numberOfIncomplete }) =>
  fromTemplate(numberOfViolations, numberOfIncomplete)

// The function that is responisble for actually posting to slack.
// This is where we use the injected webhook instance.
type PostToSlackType = (message: string) => RTE.ReaderTaskEither<Webhook, Error, IncomingWebhookResult>
const postToSlack: PostToSlackType = (message) => (webhook) => TE.tryCatch(() => webhook.send(message), E.toError)

// Prepare the message to be sent, and send it. Map typed success result to text.
type PrepareAndSendType = (axeResult: Result) => RTE.ReaderTaskEither<Webhook, Error, string>
const prepareAndSendMessage: PrepareAndSendType = (axeResult) =>
  pipe(
    prepareMessage(axeResult),
    postToSlack,
    RTE.map((result) => result.text),
  )

// Main function for the Slack "api" that will send a Slack message based on predicate
// The function takes the parsed result from axe-core, and since it returns a Reader, this function is accepting a Webhook instance
// as the last parameter. Dependency injection the functional way!
type MaybeSendType = (
  predicate: (axeResult: Result) => boolean,
) => (axeResult: Result) => RTE.ReaderTaskEither<Webhook, Error, string>
export const maybeSend: MaybeSendType = (predicate) => (axeResult) =>
  predicate(axeResult) ? prepareAndSendMessage(axeResult) : RTE.of('Nothing to report!')
