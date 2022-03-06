import {
  HasAdminDocument,
  HasPrimaryMailAccountDocument,
} from '@/graphql/generated'
import { getServerApolloClient } from '@/utils/serverApollo'
import { NextFetchEvent, NextRequest, NextResponse } from 'next/server'

export async function middleware(req: NextRequest, ev: NextFetchEvent) {
  const client = getServerApolloClient()
  const [hasPrimaryMailAccountQuery, hasAdminQuery] = await Promise.all([
    client.query({
      query: HasPrimaryMailAccountDocument,
      fetchPolicy: 'no-cache',
    }),
    client.query({
      query: HasAdminDocument,
      fetchPolicy: 'no-cache',
    }),
  ] as const)
  const isSetupPage = req.page.name?.startsWith('/setup') ?? false
  const isSetupComplete =
    hasPrimaryMailAccountQuery.data?.hasPrimaryMailAccount &&
    hasAdminQuery?.data.hasAdmin

  if (isSetupComplete) {
    if (isSetupPage) {
      return NextResponse.redirect('/')
    }

    return NextResponse.next()
  }

  if (isSetupPage) {
    return NextResponse.next()
  }

  return NextResponse.redirect('/setup')
}
