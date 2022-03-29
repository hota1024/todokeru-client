import { useCurrentUser } from '@/atoms/auth'
import { UserRole } from '@/graphql/generated'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

/**
 *
 * @param role role.
 */
export const useRequiredAuth = (role: UserRole) => {
  const [{ currentUser, isValidating }] = useCurrentUser()
  const router = useRouter()

  useEffect(() => {
    if (isValidating) {
      // checking...
      return
    }

    if (currentUser) {
      const { role: userRole } = currentUser
      const isAdmin = userRole === UserRole.Admin
      const isNormal = isAdmin || userRole === UserRole.Normal

      if (role === UserRole.Admin && isAdmin) {
        // ok
        return
      }

      if (role === UserRole.Normal && isNormal) {
        // ok
        return
      }
    }

    const to = router.asPath === '/' ? undefined : router.asPath

    if (to) {
      // router.replace({
      //   pathname: '/login',
      //   query: {
      //     to,
      //   },
      // })
    } else {
      // router.replace('/login')
    }
  }, [currentUser, isValidating, router, role])

  return isValidating
}
