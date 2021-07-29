import { AxeResult } from './generated-interfaces'
import { Result } from './types'
import { firstOrDefault } from './common'
import { flow } from 'fp-ts/lib/function'

const emptyResult = {} as AxeResult

const parseJson = (json: unknown): AxeResult[] => <AxeResult[]>json
const countViolations = (result: AxeResult): Result => ({
  numberOfViolations: result?.violations?.length ?? 0,
  numberOfIncomplete: result?.incomplete?.length ?? 0,
})

const log = (result: AxeResult[]): AxeResult[] => {
  console.log('parsed result: ', result)
  console.log('Number of violations: ', result[0].violations?.length)
  return result
} 

// eslint-disable-next-line no-unused-vars
type ParseType = (json: unknown) => Result
export const parse: ParseType = flow(parseJson, log, firstOrDefault(emptyResult), countViolations)