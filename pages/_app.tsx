import '../styles/globals.css'
import type { AppProps } from 'next/app'
import React from 'react'
import { AuthContext, createAuthContext } from '../api/user';

// const AuthContext = React.createContext(null)

function MyApp({ Component, pageProps }: AppProps) {
  const authContext = createAuthContext();

  return (
  <AuthContext.Provider value={authContext}>
    <Component {...pageProps} />
  </AuthContext.Provider>)
}

export default MyApp
