import { useCallback, useEffect } from 'react'

/**
 * use interval.
 *
 * @param fn callback fn.
 * @param ms ms.
 */
export const useInterval = (fn: () => void, ms: number): void => {
  const callback = useCallback(fn, [fn])

  useEffect(() => {
    const id = setInterval(callback, ms)

    return () => clearInterval(id)
  }, [callback, ms])
}
