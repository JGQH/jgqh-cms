import '../styles/globals.scss'
import AuthProvider from '@Auth'
import type { AppProps } from 'next/app'
import Navbar from 'components/Navbar/Navbar'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <Navbar />
      <Component {...pageProps} />
    </AuthProvider>
  )
}
export default MyApp
