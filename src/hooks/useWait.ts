import { waitFor } from '@/utils/waitFor'
import { useCallback, useState } from 'react'

/**
 * WaitFn type.
 */
export type WaitFn = (ms: number) => Promise<void>

/**
 * use wait.
 */
export const useWait = (): [WaitFn, boolean] => {
  const [waiting, setWaiting] = useState(false)
  const wait = useCallback(async (ms: number) => {
    setWaiting(true)
    await waitFor(ms)
    setWaiting(false)
  }, [])

  return [wait, waiting]
}
