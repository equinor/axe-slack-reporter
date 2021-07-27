import test from 'tape'
import { parse } from './axe-result-parser'
import json from '../example-files/dagbladet.json'

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

test('Testing output', (t) => {
  t.plan(2)
  const res = parse(json)
  t.test('3 incomplete tests are found in json', (subTest) => {
    subTest.equals(res.numberOfIncomplete, 3)
    subTest.end()
  })
  t.test('4 violations are found in json', (subTest) => {
    subTest.equal(res.numberOfViolations, 4)
    subTest.end()
  })
  t.end()
})
