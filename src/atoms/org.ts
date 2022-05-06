import { atom, useAtom } from 'jotai'

export const orgNameAtom = atom<string | null>(null)
export const useOrgName = () => useAtom(orgNameAtom)
