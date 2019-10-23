import CollatorOptions = Intl.CollatorOptions;

export const sortStrings = (
  a: string,
  b: string,
  locale: string = undefined,
  options: CollatorOptions = { numeric: true },
) => a.localeCompare(b, locale, options);
