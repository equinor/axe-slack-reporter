import { setOutput, setFailed, getInput } from '@actions/core'
import { parse } from './axe-result-parser'
import * as O from 'fp-ts/lib/Option'
import * as IO from 'fp-ts/lib/IO'
import * as T from 'fp-ts/lib/Task'
import * as E from 'fp-ts/lib/Either'
import * as TE from 'fp-ts/lib/TaskEither'
import { flow, pipe } from 'fp-ts/lib/function'
import { getJsonFileContent } from './common'
import { send } from './slack'

const getWebhookURL: IO.IO<O.Option<string>> = () => O.fromNullable(process.env.SLACK_WEBHOOK_URL)
const getFileName: IO.IO<string> = () =>
  pipe(
    getInput('fileName'),
    O.fromPredicate((fileName: string) => fileName.length > 3),
    O.getOrElse(() => 'example-files/dagbladet.json'),
  )

const setSuccess = (text: string) => setOutput(text, '0')

try {
  console.log('Report axe findings to Slack')

  // Do the magic!
  const doDaThing = flow(
    getFileName,
    getJsonFileContent,
    TE.map(parse),
    TE.chain(send(getWebhookURL())),
    T.map(E.fold(setFailed, setSuccess)),
  )()

  doDaThing() // Should be awaited, but not allowed at top level
} catch (error) {
  setFailed(error.message)
}
