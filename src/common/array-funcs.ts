export type firstOrDefaultType = <T>(defaultValue: T) => (value: (undefined | Array<T> | null)) => T
export const firstOrDefault: firstOrDefaultType = (defaultValue) => (value) =>
  value?.[0] ?? defaultValue