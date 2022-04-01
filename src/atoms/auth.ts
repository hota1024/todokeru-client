import { MeQuery } from '@/graphql/generated'
import { atom, useAtom } from 'jotai'
import { destroyCookie, parseCookies } from 'nookies'
import { useSnackbar } from 'notistack'

// jwt.
const jwtAtom = atom<string | null>(parseCookies().jwt ?? null)
export const useJWT = () => useAtom(jwtAtom)
export const useLogout = () => {
  const { enqueueSnackbar } = useSnackbar()
  const [, setJWT] = useJWT()

  return (fn?: () => void) => {
    enqueueSnackbar('ログアウトしました', { variant: 'success' })
    destroyCookie(null, 'jwt')
    setJWT(null)

    if (fn) {
      fn()
    }
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
