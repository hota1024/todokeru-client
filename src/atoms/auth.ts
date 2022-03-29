import { MeQuery } from '@/graphql/generated'
import { atom, useAtom } from 'jotai'
import { destroyCookie } from 'nookies'

// jwt.
const jwtAtom = atom<string | null>(null)
export const useJWT = () => useAtom(jwtAtom)
export const useLogout = () => {
  const [, setJWT] = useJWT()

  return () => {
    destroyCookie(null, 'jwt')
    setJWT(null)
  }
}

/**
 * CurrentUserState type.
 */
export type CurrentUserState = {
  currentUser?: MeQuery['me']
  isValidating: boolean
}

// current user.
const currentUserAtom = atom<CurrentUserState>({
  isValidating: true,
})
export const useCurrentUser = () => useAtom(currentUserAtom)
