const reducer = (f: Function, g: Function) => (...args: any[]) => f(g(...args))

export const compose = (...fns: Function[]) => fns.reduce(reducer)