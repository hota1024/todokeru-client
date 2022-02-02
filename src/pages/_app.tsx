import type { AppProps } from 'next/app'
import Head from 'next/head'
import { createEmotionCache } from '@/createEmotionCache'
import { mainTheme } from '@/themes'
import { CacheProvider, EmotionCache, ThemeProvider } from '@emotion/react'
import { CssBaseline } from '@mui/material'
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client'
import { SetupContainer } from '@/components/SetupContainer'

const clientSideEmotionCache = createEmotionCache()
const cache = new InMemoryCache()
const client = new ApolloClient({
  uri: process.env.NEXT_PUBLIC_GRAPHQL_URL,
  cache,
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
          <SetupContainer>
            <Component {...pageProps} />
          </SetupContainer>
        </ApolloProvider>
      </ThemeProvider>
    </CacheProvider>
  )
}

export default MyApp
