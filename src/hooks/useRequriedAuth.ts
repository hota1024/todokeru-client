import { useAuthChecking, useCurrentUser } from '@/atoms/auth'
import { UserRole } from '@/graphql/generated'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

/**
 *
 * @param role role.
 */
export const useRequiredAuth = (role: UserRole) => {
  const [authChecking] = useAuthChecking()
  const [currentUser] = useCurrentUser()
  const router = useRouter()

  useEffect(() => {
    if (authChecking) {
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

    router.replace(`/login?to=${router.asPath}`)
  }, [currentUser, authChecking, router, role])

  console.log(currentUser)

  return authChecking || !currentUser
}
