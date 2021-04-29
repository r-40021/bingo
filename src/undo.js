import {max, myHistory, colorList, old, changeVar, pushList, unshiftList, deleteList} from "./index";
export function undo() {
    /*Undo処理　ビンゴを1ターン戻す*/
    var numberElements = document.getElementsByClassName("history-number"); //要素を変数に代入
    var removeNumber = numberElements[numberElements.length - 1]; //消去する数をセット
    removeNumber.remove(); //履歴表示エリアから削除
    myHistory.splice(myHistory.indexOf(removeNumber.innerHTML), 1); //履歴のリストからも削除
    /*1個前の数字・枠線色を反映*/
    document.getElementById("number-inner").innerHTML = old.number[1];
    document.getElementById("bingoNumber").style.borderColor =
      colorList[old.color[1]];
    max = old.max[1];
    /*以前の最大値をレンジ/テキストボックスにセット*/
    document.getElementById("bingoMax").value = max;
    document.getElementById("bingoMaxText").value = max;
    addSelect();
    /*LocalStorageに保存*/
    localStorage.setItem("myHistory", JSON.stringify(myHistory));
    localStorage.setItem("max", old.max[1]);
    localStorage.setItem("lastColor", old.color[1]);
    document.getElementById("undo").style.visibility = "hidden";
    document.getElementById("startOver").style.visibility = "visible"; //ボタン切り替え
    getHistoryLength(); //履歴の数を取得し、HTMLに出力
    document.getElementById("spin").focus(); //Spinボタンにフォーカス
  }
  export function startOver() {
    var historyBody = document.getElementById("history-body"); //要素を変数にセット
    /*もともとの数をHTMLに出力*/
    var div = document.createElement("div");
    var oldNumber = old.number[0];
    div.className = "history-number";
    div.innerHTML = oldNumber;
    historyBody.appendChild(div);
    /*HTMLに出力*/
    document.getElementById("number-inner").innerHTML = oldNumber;
    document.getElementById("bingoNumber").style.borderColor =
      colorList[old.color[0]];
    max = old.max[0]; //最大値を変数にセット
    /*新しい最大値をレンジ/テキストボックスにセット*/
    document.getElementById("bingoMax").value = max;
    document.getElementById("bingoMaxText").value = max;
    myHistory.push(oldNumber); //履歴リストに新しい数字を追加
    addSelect();
    /*LocalStorageに保存*/
    localStorage.setItem("myHistory", JSON.stringify(myHistory));
    localStorage.setItem("max", old.max[0]);
    localStorage.setItem("lastColor", old.color[0]);
    document.getElementById("undo").style.visibility = "visible";
    document.getElementById("startOver").style.visibility = "hidden"; //ボタン切り替え
    getHistoryLength(); //履歴の数を取得し、HTMLに出力
    document.getElementById("spin").focus(); //Spinボタンにフォーカス
  }