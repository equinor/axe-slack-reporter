import { setOutput, setFailed, getInput } from '@actions/core'
import fs from 'fs'
import { parse } from './axe-result-parser'
import * as O from 'fp-ts/lib/Option'
import * as IO from 'fp-ts/lib/IO'
import * as T from 'fp-ts/lib/Task'
import * as E from 'fp-ts/lib/Either'
import { flow } from 'fp-ts/lib/function'
import { send } from './slack'
import { pipe } from 'fp-ts/lib/function'

const getWebhookURL: IO.IO<O.Option<string>> = () => O.fromNullable(process.env.SLACK_WEBHOOK_URL)
const getFileName: IO.IO<string> = () => pipe(
  getInput('fileName'),
  O.fromPredicate((fileName: string) => fileName.length > 3),
  O.getOrElse(() => 'example-files/dagbladet.json')
)

const setSuccess = (text: string) => setOutput(text, '0')

try {
  console.log('Report axe findings to Slack')
  // TODO: Possibly also use fp-ts here
  // TODO: convert to task-based approach with error handling
  const getFileContent = (fileName: string) => JSON.parse(fs.readFileSync(fileName, { encoding: 'utf8' }))

  // Do the magic!
  const doDaThing = flow(getFileName, getFileContent, parse, send(getWebhookURL()), T.map(E.fold(setFailed, setSuccess)))()
  doDaThing()

} catch (error) {
  setFailed(error.message)
}
