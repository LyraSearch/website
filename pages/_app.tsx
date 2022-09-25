import type { AppProps } from 'next/app'
import { NavBar } from '../components/NavBar'
import { Footer } from '../components/Footer'
import { DefaultSeo } from 'next-seo'
import '@unocss/reset/tailwind.css'
import 'uno.css'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <DefaultSeo
        title='✨ Lyra'
        description='Fast, in-memory, typo-tolerant, full-text search engine written in TypeScript'
        defaultTitle='✨ Lyra'
        openGraph={{
          type: 'website',
          locale: 'en_IE',
          url: 'https://lyrajs.io/',
          site_name: 'Lyra',
          description: 'Fast, in-memory, typo-tolerant, full-text search engine written in TypeScript',
          title: 'Lyra',
          images: [
            {
              url: 'https://lyrajs.io/imgs/seo/lyra-og-image.png',
              alt: 'Lyra, full-text search engine',
              height: 1080,
              width: 1920,
            }
          ]
        }}
      />
      <div className='w-full min-h-screen bg-slate-100 text-slate-100'>
        <NavBar />
        <Component {...pageProps} />
        <Footer />
      </div>
    </>
  );
}

export default MyApp
