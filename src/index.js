/*変数の定義*/
var max = 75; //最大値
var myHistory = []; //履歴
var select = []; //ビンゴの数字候補
var colorList = ["#ffa500", "#d3e15c", "#b384c7", "#F06060", "#a9ceec"]; //数字表示エリアの枠線色
var old = new Object(); //Undoボタン用のオブジェクト
old.max = []; //過去の最大値を記録（キャッシュしない）
old.number = []; //過去に出た数字を記録（キャッシュしない）
old.color = []; //過去の枠線色を記録（キャッシュしない）
var loadingTimeout;
import { loading , myTimeOut } from "./load";
window.addEventListener("load", loading, false);
window.addEventListener("load", myTimeOut, false);
import { checking, addSelect } from "./check";
window.addEventListener("load", checking, false);

window.addEventListener("resize", function () {
  flex();
  resize(); //レイアウト調整
});
window.addEventListener("DOMContentLoaded", function () {
  //レンジとテキストボックスを連動
  var range = document.getElementById("bingoMax");
  var rangeText = document.getElementById("bingoMaxText");
  range.addEventListener("input", function () {
    rangeText.value = range.value;
    max = Number(range.value);
    old.max[0] = max;
    addSelect();
  });
  rangeText.addEventListener("input", function () {
    range.value = rangeText.value;
    max = Number(range.value);
    old.max[0] = max;
    addSelect();
  });
  rangeText.addEventListener("change", function () {
    /*1~99以外の数字が入力されたときの処理*/
    if (rangeText.value < 1) {
      rangeText.value = 1; //1未満なら1にする
    }
    if (rangeText.value > 99) {
      rangeText.value = 99; //99より大きれば99にする
    }
    range.value = rangeText.value;
    max = Number(range.value);
    old.max[0] = max;
    addSelect(); //ビンゴの候補のリストを更新
  });
});
import { resize, flex } from "./resize";

if ("serviceWorker" in navigator) {
  /*Service Worker登録
  (引用:https://developers.google.com/web/fundamentals/primers/service-workers)*/
  window.addEventListener("load", function () {
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
  });
}

function getHistoryLength() {
  //履歴の数を取得し、HTMLに出力
  document.getElementById("historyLength").innerText = myHistory.length;
}
document.getElementById("privacy").addEventListener("shown.bs.modal", () => {
  let iframeElement = document.getElementById("privacy-iframe").contentWindow;
  iframeElement.location.href = "https://r-40021.github.io/privacy.html";
  resize(); //レイアウト調整処理
});
function openPage(url){
  window.open(url);
}