import { AxeResult } from './generated-interfaces'
import { Result } from './types'
import { compose, firstOrDefault } from './common'

const emptyResult = {} as AxeResult

const parseJson = (json: unknown): AxeResult[] => <AxeResult[]>json
const countViolations = (result: AxeResult): Result => ({
  numberOfViolations: result?.violations?.length ?? 0,
  numberOfIncomplete: result?.incomplete?.length ?? 0,
})

type ParseType = (json: any) => Result
export const parse: ParseType = compose(countViolations, firstOrDefault(emptyResult), parseJson)
