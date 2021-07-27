type FirstOrDefaultType = <T>(defaultValue: T) => (value: (undefined | Array<T> | null)) => T
export const firstOrDefault: FirstOrDefaultType = (defaultValue) => (value) =>
  value?.[0] ?? defaultValue