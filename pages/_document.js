import Document, { Head, Main, NextScript } from 'next/document'
import '../styles/index.scss'


export default class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx)
    return { ...initialProps }
  }

  render() {
    return (
      <html>
        <Head>
          <title>dodo-小寒的组件库</title>
          <link rel="shortcut icon" href="/static/favicon.ico" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no, target-densitydpi=device-dpi" />
          <link rel="stylesheet" href="/_next/static/style.css" />
          <link rel="stylesheet" href="https://cdn.bootcss.com/highlight.js/9.13.1/styles/a11y-light.min.css"/>
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </html>
    )
  }
}
