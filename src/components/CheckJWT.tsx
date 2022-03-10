import { useAuthChecking, useCurrentUser, useJWT } from '@/atoms/auth'
import { useMeLazyQuery } from '@/graphql/generated'
import { useRouter } from 'next/router'
import { destroyCookie, parseCookies, setCookie } from 'nookies'
import { useCallback, useEffect } from 'react'

/**
 * CheckJWT component.
 */
export const CheckJWT: React.VFC = () => {
  const [jwt, setJWT] = useJWT()
  const [getMe] = useMeLazyQuery()
  const [authChecking, setAuthChecking] = useAuthChecking()
  const [, setCurrentUser] = useCurrentUser()
  const router = useRouter()

  const checkJWTStatus = useCallback(async () => {
    setAuthChecking(true)

    if (jwt) {
      const { data } = await getMe()
      console.log(data)
      if (data) {
        setCurrentUser(data.me)
      } else {
        setJWT(null)
        setCurrentUser(null)
      }
    }

    setAuthChecking(false)
  }, [setAuthChecking, jwt, getMe, setCurrentUser, setJWT])

  // check cookie.
  useEffect(() => {
    if (authChecking) {
      return
    }

    let newJWT = jwt

    if (jwt) {
      setCookie(null, 'jwt', jwt)
    } else {
      const cookie = parseCookies()
      newJWT = cookie.jwt ?? null
      destroyCookie(null, 'jwt')
    }

    setJWT(newJWT)
    checkJWTStatus()

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [checkJWTStatus, jwt, setJWT, router.pathname])

  return <></>
}
