import {
  ApolloClient,
  InMemoryCache,
  NormalizedCacheObject,
} from '@apollo/client'
import { NextRequest } from 'next/server'
import { getGraphQlEndpoint } from './urls'

let client: ApolloClient<NormalizedCacheObject>

/**
 * returns server side apollo client.
 */
export const getServerApolloClient = (req: NextRequest): typeof client => {
  if (client) {
    return client
  }

  client = new ApolloClient({
    ssrMode: true,
    uri: getGraphQlEndpoint(req.url),
    cache: new InMemoryCache().restore({}),
  })

  return client
}
