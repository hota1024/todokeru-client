import { MeQuery } from '@/graphql/generated'
import { atom, useAtom } from 'jotai'

// jwt.
const jwtAtom = atom<string | null>(null)
export const useJWT = () => useAtom(jwtAtom)

// current user.
const currentUserAtom = atom<MeQuery['me'] | null>(null)
export const useCurrentUser = () => useAtom(currentUserAtom)

const authCheckingAtom = atom<boolean>(false)
export const useAuthChecking = () => useAtom(authCheckingAtom)
