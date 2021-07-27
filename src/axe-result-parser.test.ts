import test from 'tape'
import { parse } from './axe-result-parser'
import json from '../example-files/result.json'

test('Empty json does not crash', (t) => {
  t.assert(parse(undefined))
  t.assert(parse(null))
  t.end()
})

test('Invalid json does not crash', (t) => {
  t.assert(parse({ foo: 'bar' } as unknown as any[]))
  t.end()
})

test('Valid json does not crash', (t) => {
  t.assert(parse(json))
  t.end()
})

// test('3 violations are found in json', (t) => {
//   t.plan(1)
//   t.equal(parse(json).violations.count, 3)
// })
