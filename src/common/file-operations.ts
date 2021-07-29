
import { promises as fsAsync } from 'fs'
import * as E from 'fp-ts/lib/Either'
import * as TE from 'fp-ts/lib/TaskEither'
import { pipe } from 'fp-ts/lib/function'

type GetJsonFileContentType = (fileName: string) => TE.TaskEither<Error, any>
export const getJsonFileContent: GetJsonFileContentType = (fileName) =>
  pipe(
    TE.tryCatch(() => fsAsync.readFile(fileName, { encoding: 'utf8' }), E.toError),
    TE.map(JSON.parse),
  )
