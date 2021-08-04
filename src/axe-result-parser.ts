import { AxeResults } from 'axe-core'
import * as E from 'fp-ts/lib/Either'
import { Result } from './types'
import { flow, pipe } from 'fp-ts/lib/function'

const parseJson = (json: unknown): E.Either<Error, AxeResults> => 
  pipe(
    <AxeResults>json,                           // Try to cast json to an AxeResult
    E.fromPredicate(                            // Find out if casting went ok by applying a predicate
      (o) => o?.violations !== undefined,       // If we find violations, we assume that the json was parsed successfully
      () => new Error('Not a valid AxeResult'), // Handle error
    ),
  )
const countViolations = (result: AxeResults): Result => ({
  numberOfViolations: result.violations.length,
  numberOfIncomplete: result.incomplete.length,
})

type ParseType = (json: unknown) => E.Either<Error, Result>
export const parse: ParseType = flow(parseJson, E.map(countViolations))
