import { Html, Head, Main, NextScript } from 'next/document'
import { Fonts } from '../components/internals/Fonts'

export default function Document () {
  return (
    <Html>
      <Head>
        <Fonts />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
