export const sortStrings = (a: string, b: string) =>
  a.localeCompare(b, undefined, { numeric: true });
