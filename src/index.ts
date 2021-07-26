import { setOutput, setFailed, getInput } from '@actions/core'
import { context } from '@actions/github'
import fs, { promises as fsAsync } from 'fs'

try {
  console.log(`Hello world`)
  const fileName = getInput('fileName')
  console.log('fileName: ', fileName)
  //fsAsync.readFile(fileName).then(content => console.log(JSON.stringify(content)))
  console.log('File content:', fs.readFileSync(fileName))
  setOutput('status', '0')
  // Get the JSON webhook payload for the event that triggered the workflow
  const payload = JSON.stringify(context.payload, undefined, 2)
  console.log(`The event payload: ${payload}`)
} catch (error) {
  setFailed(error.message)
}