import { setOutput, setFailed, getInput } from '@actions/core'
import fs from 'fs'
import { parse } from './axe-result-parser'
import { fromNullable, Option } from 'fp-ts/lib/Option'
import * as IO from 'fp-ts/lib/IO'
import * as T from 'fp-ts/lib/Task'
import * as E from 'fp-ts/lib/Either'
import { flow } from 'fp-ts/lib/function'
import { send } from './slack'

const getWebhookURL: IO.IO<Option<string>> = () => fromNullable(process.env.SLACK_WEBHOOK_URL)

const setSuccess = (text: string) => setOutput(text, '0')

try {
  console.log('Report axe findings to Slack')
  // TODO: Possibly also use fp-ts here
  const getFileName = () => getInput('fileName') || 'example-files/dagbladet.json'
  // TODO: convert to task-based approach with error handling
  const getFileContent = (fileName: string) => JSON.parse(fs.readFileSync(fileName, { encoding: 'utf8' }))

  // Do the magic!
  const doDaThing = flow(getFileName, getFileContent, parse, send(getWebhookURL()), T.map(E.fold(setFailed, setSuccess)))()
  doDaThing()

} catch (error) {
  setFailed(error.message)
}
