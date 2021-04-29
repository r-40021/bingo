import {myHistory, select, colorList, old, changeVar, pushList, unshiftList, deleteList} from "./index";
import {makeDisableSet,removeDisableSet} from "./btnDisabled";
export function reset() {
    //履歴のリセット処理
    document.getElementById("undo").style.visibility = "hidden";
    document.getElementById("startOver").style.visibility = "hidden"; //Undo機能を無効化
    //リセット
    makeDisableSet(); //フッターを選択不可にする
    localStorage.removeItem("myHistory");
    localStorage.removeItem("lastColor"); //LocalStorageから、履歴と数字表示エリアの枠線色を削除
    document.getElementById("number-inner").innerHTML = null; //数字表示エリアを空に
    document.getElementById("history-body").innerHTML = null; //履歴表示エリアを空に
    document.getElementById("bingoNumber").style.borderColor = colorList[0]; //数字表示エリアの枠線色を初期値に
    /*変数のリセット*/
    myHistory = [];
    select = [];
    old = new Object();
    old.max = [];
    old.number = [];
    old.color = [];
    addSelect(); //ビンゴの数字候補を更新
    getHistoryLength(); //履歴の数を取得し、HTMLに出力
    removeDisableSet(); //フッターを選択可能にする
  }
export function resetAsk() {
    //履歴をリセットしてもいいか、尋ねる
    new bootstrap.Modal(document.getElementById("reset-modal")).show();
  }