import type { AppProps } from 'next/app'
import Head from 'next/head'
import { createEmotionCache } from '@/createEmotionCache'
import { mainTheme } from '@/themes'
import { CacheProvider, EmotionCache, ThemeProvider } from '@emotion/react'
import { CssBaseline } from '@mui/material'

const clientSideEmotionCache = createEmotionCache()

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
        <Component {...pageProps} />
      </ThemeProvider>
    </CacheProvider>
  )
}

export default MyApp
