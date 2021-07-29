import test from 'tape'
import * as E from 'fp-ts/lib/Either'
import { parse } from './axe-result-parser'
import json from '../example-files/result.json'
import { pipe } from 'fp-ts/lib/function'

test('Empty json does not crash', (t) => {
  t.assert(parse(undefined))
  t.assert(parse(null))
  t.end()
})

test('Invalid json does not crash', (t) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  t.assert(parse({ foo: 'bar' } as unknown as any[]))
  t.end()
})

test('Valid json does not crash', (t) => {
  t.assert(parse(json))
  t.end()
})

test('Testing output with proper json input', (t) => {
  t.plan(2)
  const res = parse(json)
  t.test('0 incomplete tests are found in json', (subTest) => {
    pipe(
      res,
      E.match(
        (error) => subTest.notOk(error),
        (r) => subTest.equals(r.numberOfIncomplete, 0),
      ),
    )
    subTest.end()
  })
  t.test('4 violations are found in json', (subTest) => {
    pipe(
      res,
      E.match(
        (error) => subTest.notOk(error),
        (r) => subTest.equals(r.numberOfViolations, 4),
      ),
    )
    subTest.end()
  })
  t.end()
})
