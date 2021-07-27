import { setOutput, setFailed, getInput } from '@actions/core'
import { context } from '@actions/github'
import fs, { promises as fsAsync } from 'fs'
import { firstOrDefault } from './common'
import { AxeResult, ViolationsEntity } from './generated-interfaces'

try {
  console.log(`Hello world`)
  const fileName = getInput('fileName') || 'example-files/dagbladet.json'
  console.log('fileName: ', fileName)
  //fsAsync.readFile(fileName).then(content => console.log(JSON.stringify(content)))
  const fileContent = JSON.parse(fs.readFileSync(fileName, { encoding: 'utf8' }))
  const typedContent = <AxeResult[]>fileContent
  // TODO: Parse typed content
  // Also TODO: Possible to use Option datatype instead of null?
  // const parsedResult = parse(fileContent)
  console.log('output', (typedContent[0].violations as ViolationsEntity[])[0].nodes)
  //console.log('parsed result: ', JSON.stringify(typedContent))
  setOutput('status', '0')
  // Get the JSON webhook payload for the event that triggered the workflow
  const payload = JSON.stringify(context.payload, undefined, 2)
  console.log(`The event payload: ${payload}`)
} catch (error) {
  setFailed(error.message)
}