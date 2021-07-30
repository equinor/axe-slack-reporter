import { setOutput, setFailed, getInput } from '@actions/core'
import { parse } from './axe-result-parser'
import * as O from 'fp-ts/lib/Option'
import * as IO from 'fp-ts/lib/IO'
import * as E from 'fp-ts/lib/Either'
import * as TE from 'fp-ts/lib/TaskEither'
import * as RT from 'fp-ts/lib/ReaderTask'
import * as RTE from 'fp-ts/lib/ReaderTaskEither'
import { flow, pipe } from 'fp-ts/lib/function'
import { getJsonFileContent } from './common'
import { maybeSend } from './slack'
import { Webhook, Result } from './types'
import { IncomingWebhook } from '@slack/webhook'

const getWebhookURL: IO.IO<O.Option<string>> = () => O.fromNullable(process.env.SLACK_WEBHOOK_URL)
const getFileName: IO.IO<string> = () =>
  pipe(
    getInput('fileName'),
    O.fromPredicate((fileName: string) => fileName.length > 3),
    O.getOrElse(() => 'example-files/dagbladet.json'),
  )

const setSuccess = (text: string) => setOutput(text, '0')
// Small utility for enabling logging of success and failures
type WithLoggingType = <T>(fn: (message: T) => void, caption?: string) => (message: T) => void
const withLogging: WithLoggingType = (fn, caption) => (message) => {
  console.log(caption, message)
  fn(message)
}

type CheckIfWeShouldSendType = (axeResult: Result) => boolean
const checkIfWeShouldSend: CheckIfWeShouldSendType = ({ numberOfViolations, numberOfIncomplete }) =>
  numberOfViolations > 0 && numberOfIncomplete > 0

console.log('Report axe findings to Slack')

// Do the magic!
const doDaThing = flow(
  getFileName,
  getJsonFileContent,
  TE.chainEitherK(parse),
  RTE.fromTaskEither,
  RTE.chain(maybeSend(checkIfWeShouldSend)),
  RT.map(E.fold(withLogging(setFailed, 'error'), withLogging(setSuccess, 'success'))),
)()

flow(
  getWebhookURL,
  O.match(
    () => setFailed('No url provided! Canceling!'),
    (url) =>
      doDaThing(new IncomingWebhook(url) as Webhook)().catch((error) => {
        console.log(error.message)
        setFailed(error.message)
      }),
  ),
)()
