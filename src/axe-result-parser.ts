import { compose } from "./common"

const fieldsToExtract = ["incomplete", "violations"]
const emptyResult : Input = { violations: [] }

const computeAttributes = (fieldValues: any[]): AttributeInfo => ({
  count: fieldValues?.length || 0,
})
const getFirstEntry = (json: unknown[]) => (json && json[0]) || emptyResult
const extractFields = (fields: string[]) => (json: Record<string, unknown>) =>
  fields.reduce(
    (result: Record<string, unknown>, field: string) => ({ ...result, [field]: computeAttributes(json[field] as unknown[]) }),
    {}
  )

export const parse = (jsonResult: unknown[]) =>
  compose(extractFields(fieldsToExtract), getFirstEntry)(jsonResult)