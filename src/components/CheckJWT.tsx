import { useCurrentUser, useJWT } from '@/atoms/auth'
import { useMeLazyQuery } from '@/graphql/generated'
import { destroyCookie, parseCookies, setCookie } from 'nookies'
import { useCallback, useEffect, useState } from 'react'

/**
 * CheckJWT component.
 */
export const CheckJWT: React.VFC = () => {
  const [jwt, setJWT] = useJWT()
  const [getMe] = useMeLazyQuery()
  const [, setCurrentUser] = useCurrentUser()

  const checkJWTStatus = useCallback(async () => {
    setCurrentUser({
      isValidating: true,
    })

    if (jwt) {
      try {
        const { data } = await getMe()
        if (data) {
          setCurrentUser({
            currentUser: data.me,
            isValidating: false,
          })
        } else {
          throw ''
        }
      } catch {
        destroyCookie(null, 'jwt')
        setJWT(null)
        setCurrentUser({
          isValidating: false,
        })
      }
    } else {
      setCurrentUser({
        isValidating: false,
      })
    }
  }, [jwt, getMe, setCurrentUser, setJWT])

  // check cookie.
  useEffect(() => {
    let newJWT = jwt

    if (jwt) {
      setCookie(null, 'jwt', jwt)
    } else {
      const cookie = parseCookies()
      newJWT = cookie.jwt ?? null
    }

    if (!newJWT) {
      destroyCookie(null, 'jwt')
    }

    if (jwt !== newJWT) {
      setJWT(newJWT)
    }

    checkJWTStatus()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [jwt])

  return <></>
}
