import {
  ApolloClient,
  InMemoryCache,
  NormalizedCacheObject,
} from '@apollo/client'

let client: ApolloClient<NormalizedCacheObject>

/**
 * returns server side apollo client.
 */
export const getServerApolloClient = (): typeof client => {
  if (client) {
    return client
  }

  client = new ApolloClient({
    ssrMode: true,
    uri: process.env.NEXT_PUBLIC_GRAPHQL_URL,
    cache: new InMemoryCache().restore({}),
  })

  return client
}
