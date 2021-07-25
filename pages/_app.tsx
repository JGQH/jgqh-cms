import '../styles/globals.scss'
import AuthProvider from '@Auth'
import type { AppProps } from 'next/app'
import Navbar from 'components/Navbar/Navbar'

const NoNavbar:string[] = ['/login']

function MyApp({ Component, pageProps, router }: AppProps) {
  return (
    <AuthProvider>
      {!NoNavbar.includes(router.route) && <Navbar />}
      <Component {...pageProps} />
    </AuthProvider>
  )
}
export default MyApp
