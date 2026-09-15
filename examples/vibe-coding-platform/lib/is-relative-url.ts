export function isRelativeUrl(url: string): boolean {
  try {
    new URL(url)
    return false
// eslint-disable-next-line no-unused-vars
  } catch (error) {
    return true
  }
}
