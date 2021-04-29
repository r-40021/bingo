import {flex, resize} from "./resize";
import {removeDisableSet} from "./btnDisabled";
import {getHistoryLength} from "./history";

import {max, myHistory, select, colorList, old, changeVar, pushList, unshiftList, deleteList} from "./index";
export function checking() {
    if (storageAvailable("localStorage")) {
    } else {
      alert("お使いの環境では、保存機能はご利用になれません。"); //Localstorageが利用不可のとき
    }
    if (window.navigator.userAgent.toLowerCase().indexOf("android") !== -1) {
      /*Androidのときに「共有」アイコンを変化*/
      var elements = document.getElementsByClassName("shareIcon");
      for (let i = 0; i < elements.length; i++) {
        elements[i].classList.replace("bi-box-arrow-up", "bi-share");
      }
    }
    flex();
    resize(); //レイアウト調整処理
    //読み込み
    if (localStorage.getItem("myHistory")) {
      /*履歴読み込み*/
      if (JSON.parse(localStorage.getItem("myHistory")).length >= 1) {
        var his = localStorage.getItem("myHistory");
        changeVar("myHistory",JSON.parse(his))
        var historyBody = document.getElementById("history-body");
        for (let i = 0; i < myHistory.length; i++) {
          var div = document.createElement("div"); //HTMLに代入　それぞれにdiv要素を作成している
          div.className = "history-number";
          div.innerHTML = myHistory[i];
          historyBody.appendChild(div);
        }
        document.getElementById("number-inner").innerHTML =
          myHistory[myHistory.length - 1];
        unshiftList("old.number",Number(myHistory[myHistory.length - 1]));
        historyBody.scroll(
          0,
          historyBody.scrollHeight - historyBody.clientHeight //履歴表示エリアを一番下までスクロール
        );
      }
    }
    if (localStorage.getItem("max")) {
      /*最大値取得*/
      changeVar("max",Number(localStorage.getItem("max")))
      document.getElementById("bingoMax").value = max;
      document.getElementById("bingoMaxText").value = max;
      unshiftList("old.max", Number(max));
    }
    if (localStorage.getItem("lastColor")) {
      /*最後の色を取得*/
      document.getElementById("bingoNumber").style.borderColor =
        colorList[Number(localStorage.getItem("lastColor"))];
      unshiftList("old.color", Number(localStorage.getItem("lastColor")));
    }
    addSelect();
    getHistoryLength();
    removeDisableSet(); //フッターを選択可能に
  }
export function addSelect() {
    changeVar("select",[]);
    /*==========
    select(ビンゴの数字の候補を保存するリスト)=max(最大値)までのすべての数-myHistory(履歴)
    for文を用いて、1からmax(設定した最大値)までの数字が履歴に含まれているかを確認。
    もし、履歴に含まれていなければselectに追加。
    この処理に時間がかからないよう、max(最大値)は99までに制限している。
    ==========*/
    localStorage.setItem("max", max);
    for (let i = 0; i < max; i++) {
      if (myHistory.indexOf(i + 1) === -1 && select.indexOf(i + 1) === -1) {
        pushList("select", i+1);
      }
    }
  }
export function storageAvailable(type) {
    //localStorageが利用可能かチェック(引用:https://developer.mozilla.org/ja/docs/Web/API/Web_Storage_API/Using_the_Web_Storage_API#testing_for_availability)
    var storage;
    try {
      storage = window[type];
      var x = "__storage_test__";
      storage.setItem(x, x);
      storage.removeItem(x);
      return true;
    } catch (e) {
      return (
        e instanceof DOMException &&
        // everything except Firefox
        (e.code === 22 ||
          // Firefox
          e.code === 1014 ||
          // test name field too, because code might not be present
          // everything except Firefox
          e.name === "QuotaExceededError" ||
          // Firefox
          e.name === "NS_ERROR_DOM_QUOTA_REACHED") &&
        // acknowledge QuotaExceededError only if there's something already stored
        storage &&
        storage.length !== 0
      );
    }
  }