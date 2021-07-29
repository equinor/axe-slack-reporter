/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-unused-vars */
type CF = (...args: any[]) => any

type LastFnReturnType<T extends any[]> = ReturnType<T[0]>

// eslint-disable-next-line @typescript-eslint/ban-types
type ReducerType = <T extends CF[]>(...args: any[]) => (acc: LastFnReturnType<T>, fn: Function) => LastFnReturnType<T>
const reducer: ReducerType = (...args) => (acc, fn) => {
  const [, ...rest] = args
  return acc == null ? fn(...args) : fn(acc, ...rest)
}

type ComposeType = <T extends CF[]>(...fns: T) => (...args: any[]) => LastFnReturnType<T>
export const compose: ComposeType = (...fns) => (...args) => fns.reduceRight(reducer(...args), undefined)