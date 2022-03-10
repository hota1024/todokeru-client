import { useJWT } from '@/atoms/auth'
import { useMeLazyQuery } from '@/graphql/generated'
import { parseCookies, setCookie } from 'nookies'
import { useCallback, useEffect } from 'react'

/**
 * CheckJWT component.
 */
export const CheckJWT: React.VFC = () => {
  const [jwt, setJWT] = useJWT()
  const [getMe] = useMeLazyQuery()

  const checkJWTStatus = useCallback(async () => {
    if (jwt) {
      try {
        await getMe()
      } catch {
        setJWT(null)
      }
    }
  }, [jwt, getMe, setJWT])

  // check cookie.
  useEffect(() => {
    let newJWT = jwt

    if (jwt) {
      setCookie(null, 'jwt', jwt)
    } else {
      const cookie = parseCookies()
      newJWT = cookie.jwt ?? null
    }

    setJWT(newJWT)
    checkJWTStatus()
  }, [checkJWTStatus, jwt, setJWT])

  return <></>
}
