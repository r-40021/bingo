import {myHistory, changeVar, pushList, unshiftList, deleteList} from "./index";
export function getHistoryLength() {
    //履歴の数を取得し、HTMLに出力
    document.getElementById("historyLength").innerText = myHistory.length;
  }
  document.getElementById("privacy").addEventListener("shown.bs.modal", () => {
    let iframeElement = document.getElementById("privacy-iframe").contentWindow;
    iframeElement.location.href = "https://r-40021.github.io/privacy.html";
    resize(); //レイアウト調整処理
  });