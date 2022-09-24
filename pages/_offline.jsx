// index.jsx の内容を返す
import { useEffect } from "react";
import Page from ".";

function Fallback() {
  useEffect(() => {
    alert("オフラインです。\nアプリが正常に動作しない可能性があります。");
  }, []);
  return <Page />;
}
export default Fallback;