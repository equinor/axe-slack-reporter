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

// eslint-disable-next-line no-unused-vars
type ParseType = (json: unknown) => Result
export const parse: ParseType = flow(parseJson, firstOrDefault(emptyResult), countViolations)