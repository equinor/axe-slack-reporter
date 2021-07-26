import { setOutput, setFailed, getInput } from '@actions/core'
import { context } from '@actions/github'

try {
  console.log(`Hello world`)
  const fileName = getInput('fileName')
  console.log('fileName: ', fileName)
  setOutput('status', '0')
  // Get the JSON webhook payload for the event that triggered the workflow
  const payload = JSON.stringify(context.payload, undefined, 2)
  console.log(`The event payload: ${payload}`)
} catch (error) {
  setFailed(error.message)
}