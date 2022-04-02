import type { AppProps } from 'next/app'
import Head from 'next/head'
import { createEmotionCache } from '@/createEmotionCache'
import { mainTheme } from '@/themes'
import { CacheProvider, EmotionCache, ThemeProvider } from '@emotion/react'
import { CssBaseline } from '@mui/material'
import {
  ApolloClient,
  ApolloLink,
  ApolloProvider,
  createHttpLink,
  InMemoryCache,
} from '@apollo/client'
import { parseCookies } from 'nookies'
import { CheckJWT } from '@/components/CheckJWT'
import { SnackbarProvider } from 'notistack'
import { ConfirmDialog } from '@/components/ConfirmDialog/ConfirmDialog'

const clientSideEmotionCache = createEmotionCache()
const cache = new InMemoryCache()
const httpLink = createHttpLink({
  uri: process.env.NEXT_PUBLIC_GRAPHQL_URL,
})
const authLink = new ApolloLink((operation, forward) => {
  const { jwt } = parseCookies()

  if (jwt) {
    operation.setContext({
      headers: {
        authorization: `Bearer ${jwt}`,
      },
    })
  }

  return forward(operation)
})
const client = new ApolloClient({
  cache,
  link: authLink.concat(httpLink),
})

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache
}

function MyApp(props: MyAppProps) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props

  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <ThemeProvider theme={mainTheme}>
        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
        <CssBaseline />
        <ApolloProvider client={client}>
          <SnackbarProvider maxSnack={5}>
            <CheckJWT />
            <Component {...pageProps} />
            <ConfirmDialog />
          </SnackbarProvider>
        </ApolloProvider>
      </ThemeProvider>
    </CacheProvider>
  )
}

export default MyApp
