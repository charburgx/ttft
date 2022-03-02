import '../styles/globals.css'
import type { AppProps } from 'next/app'
import React from 'react'
import { AuthContext, createAuthContext } from '../api/user';
import Head from 'next/head'
import * as ga from '../helpers/ga'
import { useEffect } from 'react'
import { useRouter } from 'next/router'

// const AuthContext = React.createContext(null)

function MyApp({ Component, pageProps }: AppProps) {
  const authContext = createAuthContext();

  const router = useRouter()

  useEffect(() => {
    const handleRouteChange = (url: string) => {
      ga.pageview(url)
    }
    //When the component is mounted, subscribe to router changes
    //and log those page views
    router.events.on('routeChangeComplete', handleRouteChange)

    // If the component is unmounted, unsubscribe
    // from the event with the `off` method
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange)
    }
  }, [router.events])

  return (<>
    <AuthContext.Provider value={authContext}>
      <Component {...pageProps} />
    </AuthContext.Provider>
  </>)
}

export default MyApp
