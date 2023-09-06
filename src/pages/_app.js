import '@/styles/globals.scss'

import { ThemeProvider } from 'next-themes'
import { SessionProvider } from 'next-auth/react'

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