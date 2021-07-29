import { AxeResults } from 'axe-core'
import * as E from 'fp-ts/lib/Either'
import { Result } from './types'
import { flow, pipe } from 'fp-ts/lib/function'

const parseJson = (json: unknown): E.Either<Error, AxeResults> => 
  pipe(
    <AxeResults>json,
    E.fromPredicate(
      (o) => o?.violations !== undefined,
      () => new Error('Not a valid AxeResult'),
    ),
  )
const countViolations = (result: AxeResults): Result => ({
  numberOfViolations: result.violations.length,
  numberOfIncomplete: result.incomplete.length,
})

const log = (result: AxeResults): AxeResults => {
  console.log('parsed result: ', result)
  console.log('Number of violations: ', result.violations.length)
  return result
}

// eslint-disable-next-line no-unused-vars
type ParseType = (json: unknown) => E.Either<Error, Result>
export const parse: ParseType = flow(parseJson, E.map(log), E.map(countViolations))
