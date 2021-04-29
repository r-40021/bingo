/*変数の定義*/
export var max = 75; //最大値
export var myHistory = []; //履歴
export var select = []; //ビンゴの数字候補
export var colorList = ["#ffa500", "#d3e15c", "#b384c7", "#F06060", "#a9ceec"]; //数字表示エリアの枠線色
export var old = new Object(); //Undoボタン用のオブジェクト
old.max = []; //過去の最大値を記録（キャッシュしない）
old.number = []; //過去に出た数字を記録（キャッシュしない）
old.color = []; //過去の枠線色を記録（キャッシュしない）
// import
import "bootstrap/dist/css/bootstrap.min.css";//bootstrap
const bootstrap = require('bootstrap') 
import { loading , myTimeOut } from "./load";
import "./style.css";
import { resize, flex } from "./resize";
import { checking, addSelect } from "./check";
import {spin} from "./spin";
import {reset, resetAsk} from "./reset";
import {undo, startOver} from "./undo";
window.addEventListener("load", loading, false);
window.addEventListener("load", myTimeOut, false);
window.addEventListener("load", checking, false);

window.addEventListener("resize", function () {
  flex();
  resize(); //レイアウト調整
});

window.spin = spin;
if ("serviceWorker" in navigator) {
  /*Service Worker登録
  (引用:https://developers.google.com/web/fundamentals/primers/service-workers)*/
  window.addEventListener("load", function () {
    navigator.serviceWorker.register("../sw.js").then(
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

function openPage(url){
  window.open(url);
}
export function changeVar (value){
  max = value;
}
export function pushList (name,value){
  if(name==="myHistory"){
    myHistory.push(value);
  } else if(name==="select"){
    select.push(value);
  } else if(name==="old.max"){
    old.max.push(value);
  } else if(name==="old.number"){
    old.number.push(value);
  } else if(name==="old.color"){
    old.color.push(value);
  }
}
export function unshiftList (name,value){
  if(name==="myHistory"){
    myHistory.unshift(value);
  } else if(name==="select"){
    select.unshift(value);
  } else if(name==="old.max"){
    old.max.unshift(value);
  } else if(name==="old.number"){
    old.number.unshift(value);
  } else if(name==="old.color"){
    old.color.unshift(value);
  }
}
export function deleteList (name,value){
  if(name==="myHistory"){
    myHistory.splice(myHistory.indexOf(value), 1);
  } else if(name==="select"){
    select.splice(select.indexOf(value), 1);
  } else if(name==="old.max"){
    old.max.splice(old.max.indexOf(value), 1);
  } else if(name==="old.number"){
    old.number.splice(old.number.indexOf(value), 1);
  } else if(name==="old.color"){
    old.color.splice(old.color.indexOf(value), 1);
  }
}