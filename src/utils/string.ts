export const toTitleCase = (str?: string) => {
  if (!str) return '';
  return str.replace(/\b\w/g, char => char.toUpperCase());
}
