import '@/styles/globals.scss'
import '@/styles/progress.scss'

import { ThemeProvider } from 'next-themes'
import { SessionProvider } from 'next-auth/react'

import NProgress from 'nprogress'
import Router from 'next/router'

Router.events.on('routeChangeStart', () => NProgress.start())

Router.events.on('routeChangeComplete', () => NProgress.done())

Router.events.on('routeChangeError', () => NProgress.done())

const App = ({ Component, pageProps: { session, ...pageProps } }) => {

  const Layout = Component.Layout || (({ children }) => children)

  return (
    <ThemeProvider
      defaultTheme="dark"
      enableSystem={false}
      disableTransitionOnChange
    >
      <SessionProvider session={session}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </SessionProvider>
    </ThemeProvider>
  )
}

export default App