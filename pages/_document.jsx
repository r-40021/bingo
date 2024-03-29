import NextDocument, { Html, Head, Main, NextScript } from "next/document";

class Document extends NextDocument {
  render() {
    return (
      <Html lang="ja">
        <Head>
          <meta charSet="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          {/* Favicon */}
          <link
            rel="icon"
            type="image/png"
            sizes="32x32"
            href="./favicon/favicon-32x32.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="16x16"
            href="./favicon/favicon-16x16.png"
          />
          <link rel="manifest" href="./favicon/site.webmanifest" />
          <link
            rel="mask-icon"
            href="./favicon/safari-pinned-tab.svg"
            color="#5bbad5"
          />
          <link rel="shortcut icon" href="./favicon/favicon.ico" />
          <meta name="msapplication-TileColor" content="#da532c" />
          <meta
            name="msapplication-config"
            content="./favicon/browserconfig.xml"
          />
          <meta name="apple-mobile-web-app-capable" content="yes" />
          <meta
            name="apple-mobile-web-app-status-bar-style"
            content="default"
          />
          <meta name="apple-mobile-web-app-title" content="やまだBINGO" />
          <link
            rel="apple-touch-icon"
            sizes="180x180"
            href="./favicon/apple-touch-icon.png"
          />
          {/* OGP */}
          <meta name="twitter:card" content="summary_large_image" />
          <meta property="og:url" content="https://bingo.frogapp.net" />
          <meta property="og:type" content="website" />
          <meta property="og:title" content="やまだBINGO" />
          <meta
            property="og:description"
            content="自動保存機能を搭載した、インストール不要のオンラインビンゴマシーン"
          />
          <meta property="og:site_name" content="やまだBINGO" />
          <meta
            property="og:image"
            content="https://bingo.frogapp.net/favicon/ogp.png"
          />
          <meta name="theme-color" content="#f8f9fa" id="headThemeColor" />
          {/* Splash Screens */}
          <link
            href="./splashscreens/iphone5_splash.png"
            media="(device-width: 320px) and (device-height: 568px) and (-webkit-device-pixel-ratio: 2)"
            rel="apple-touch-startup-image"
          />
          <link
            href="./splashscreens/iphone6_splash.png"
            media="(device-width: 375px) and (device-height: 667px) and (-webkit-device-pixel-ratio: 2)"
            rel="apple-touch-startup-image"
          />
          <link
            href="./splashscreens/iphoneplus_splash.png"
            media="(device-width: 621px) and (device-height: 1104px) and (-webkit-device-pixel-ratio: 3)"
            rel="apple-touch-startup-image"
          />
          <link
            href="./splashscreens/iphonex_splash.png"
            media="(device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3)"
            rel="apple-touch-startup-image"
          />
          <link
            href="./splashscreens/iphonexr_splash.png"
            media="(device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 2)"
            rel="apple-touch-startup-image"
          />
          <link
            href="./splashscreens/iphonexsmax_splash.png"
            media="(device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 3)"
            rel="apple-touch-startup-image"
          />
          <link
            href="./splashscreens/ipad_splash.png"
            media="(device-width: 768px) and (device-height: 1024px) and (-webkit-device-pixel-ratio: 2)"
            rel="apple-touch-startup-image"
          />
          <link
            href="./splashscreens/ipadpro1_splash.png"
            media="(device-width: 834px) and (device-height: 1112px) and (-webkit-device-pixel-ratio: 2)"
            rel="apple-touch-startup-image"
          />
          <link
            href="./splashscreens/ipadpro3_splash.png"
            media="(device-width: 834px) and (device-height: 1194px) and (-webkit-device-pixel-ratio: 2)"
            rel="apple-touch-startup-image"
          />
          <link
            href="./splashscreens/ipadpro2_splash.png"
            media="(device-width: 1024px) and (device-height: 1366px) and (-webkit-device-pixel-ratio: 2)"
            rel="apple-touch-startup-image"
          />
          <meta
            content="履歴や設定を自動で保存する機能を搭載した、インストール不要のビンゴマシーンです。"
            name="description"
          />

          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin />
          <link
            href="https://fonts.googleapis.com/css2?family=Roboto:wght@500&display=swap&text=1234567890"
            rel="stylesheet"
          />

          <title>やまだBINGO</title>
        </Head>
        <body>
          <noscript>JavaScript を有効にしてください。</noscript>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default Document;
