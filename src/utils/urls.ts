/**
 * returns GraphQL endpoint.
 */
export const getGraphQlEndpoint = (): string => {
  if (process.env.NEXT_PUBLIC_CLIENT_TYPE === 'standalone') {
    const url = process.env.NEXT_PUBLIC_GRAPHQL_URL

    if (typeof url === 'string') {
      return url
    }

    throw new Error('GraphQL endpoint is not a string')
  }

  if (process.env.NEXT_PUBLIC_CLIENT_TYPE === 'shared') {
    const subdomain = getSubdomain(location.origin)

    if (!subdomain) {
      throw new Error('you should access this site via todokeru.info')
    }

    return `https://${subdomain}.api.todokeru.info/graphql`
  }

  throw new Error(
    'invalid client type. check your NEXT_PUBLIC_CLIENT_TYPE env.'
  )
}

export const getSubdomain = (origin: string): string | undefined => {
  const matches = origin.match(/^https:\/\/(.*)\..*\./)

  if (matches) {
    return matches[1]
  }
}
