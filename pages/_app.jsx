import { useEffect } from "react";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    if ("serviceWorker" in navigator) {
      /*Service Worker登録
      (引用:https://developers.google.com/web/fundamentals/primers/service-workers)*/
      navigator.serviceWorker.register("sw.js").then(
        function (registration) {
          // Registration was successful
          console.log(
            "ServiceWorker registration successful with scope: ",
            registration.scope
          );
        },
        function (err) {
          // registration failed :(
          console.log("ServiceWorker registration failed: ", err);
        }
      );
    }
  }, []);

  return <Component {...pageProps} />
}

export default MyApp;
