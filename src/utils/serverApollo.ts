import {
  ApolloClient,
  InMemoryCache,
  NormalizedCacheObject,
} from '@apollo/client'
import { getGraphQlEndpoint } from './urls'

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
    uri: getGraphQlEndpoint(),
    cache: new InMemoryCache().restore({}),
  })

  return client
}
