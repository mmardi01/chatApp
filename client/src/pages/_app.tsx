import type { AppProps } from 'next/app'
import MainLayout from '../../components/MainLayout'
import '../styles/globals.css'

export default function App({ Component, pageProps }: AppProps) {
  return (
      <MainLayout>
        <Component {...pageProps} />
      </MainLayout>
  )
}
