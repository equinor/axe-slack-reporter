import { setOutput, setFailed, getInput } from '@actions/core'
import { context } from '@actions/github'
import fs, { promises as fsAsync } from 'fs'
import { parse } from './axe-result-parser'
import { AxeResult, ViolationsEntity } from './generated-interfaces'
import { none, some, match, fromNullable, Option } from 'fp-ts/lib/Option'
import * as IO from 'fp-ts/lib/IO'
import * as O from 'fp-ts/lib/Option'
import * as T from 'fp-ts/lib/Task'
import * as E from 'fp-ts/lib/Either'
import * as TE from 'fp-ts/lib/TaskEither'
import { flow } from 'fp-ts/lib/function'
import { send } from './slack'

const getWebhookURL = (): IO.IO<Option<string>> => () => fromNullable(process.env.SLACK_WEBHOOK_URL)

const setSuccess = (text: string) => setOutput(text, '0')

try {
  console.log('Report axe findings to Slack')
  // TODO: Possibly also use fp-ts here
  const getFileName = () => getInput('fileName') || 'example-files/dagbladet.json'
  // TODO: convert to task-based approach with error handling
  const getFileContent = (fileName: string) => JSON.parse(fs.readFileSync(fileName, { encoding: 'utf8' }))

  // So the magic!
  const doDaThing = flow(getFileName, getFileContent, parse, send(getWebhookURL()()), T.map(E.fold(setFailed, setSuccess)))()
  doDaThing()

  // Get the JSON webhook payload for the event that triggered the workflow
  // const payload = JSON.stringify(context.payload, undefined, 2)
  // console.log(`The event payload: ${payload}`)
} catch (error) {
  setFailed(error.message)
}
