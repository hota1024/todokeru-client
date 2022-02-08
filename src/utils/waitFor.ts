/**
 * returns a promise that resolves after the given amount of time.
 *
 * @param ms wait time in milliseconds.
 */
export const waitFor = (ms: number): Promise<void> => {
  return new Promise((r) => setTimeout(r, ms))
}
