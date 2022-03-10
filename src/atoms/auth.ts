import { User } from '@/graphql/generated'
import { atom, useAtom } from 'jotai'

// jwt.
const jwtAtom = atom<string | null>(null)
export const useJWT = () => useAtom(jwtAtom)

// current user.
const currentUserAtom = atom<User | null>(null)
export const useCurrentUser = () => useAtom(currentUserAtom)
