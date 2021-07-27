import { AxeResult } from './generated-interfaces'
import { Result } from './types'
import { compose, firstOrDefault } from './common'

const emptyResult = {} as AxeResult

const parseJson = (json: unknown): AxeResult[] => <AxeResult[]>json
const countViolations = (result: AxeResult): Result => ({ numberOfViolations: result?.violations?.length ?? 0 })

export type ParseType = (json: unknown) => Result
export const parse: ParseType = compose(countViolations, firstOrDefault(emptyResult), parseJson)