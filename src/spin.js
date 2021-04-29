import {max, myHistory, select, colorList, old, changeVar, pushList, unshiftList, deleteList} from "./index";
const bootstrap = require('bootstrap') 
export function spin() {
    //シャッフル
    if (select.length <= 0) {
      var endModal = new bootstrap.Modal(document.getElementById("end-modal"));
      endModal.show();
    } else {
      makeDisableSet();
      var undoElement = document.getElementById("undo");
      undoElement.style.visibility = "hidden";
      document.getElementById("startOver").style.visibility = "hidden";
      var count = 0;
      var numberElement = document.getElementById("bingoNumber");
      if (select.length === 1) {
        var stop = 5;
      } else {
        var stop = Math.floor(Math.random() * (12 - 5) + 5);
      }
      var historyBody = document.getElementById("history-body");
      var spin = setInterval(() => {
        var index = Math.floor(Math.random() * select.length);
        var display = select[index];
        document.getElementById("number-inner").innerHTML = display;
        var colorIndex = count % colorList.length;
        numberElement.style.borderColor = colorList[colorIndex];
        count++;
        if (count >= stop) {
          /*5~12の乱数回実行したら停止*/
          clearInterval(spin);
          var div = document.createElement("div");
          div.className = "history-number";
          div.innerHTML = display;
          myHistory.push(display);
          localStorage.setItem("myHistory", JSON.stringify(myHistory));
          localStorage.setItem("lastColor", colorIndex); //LocalStorageに保存
          select.splice(select.indexOf(display), 1); //ビンゴ候補のリストから該当する数字を削除
          historyBody.appendChild(div);
          old.max.unshift(Number(max));
          old.number.unshift(Number(display));
          old.color.unshift(Number(colorIndex));
          if (
            old.number.length >= 2 &&
            old.max.length >= 2 &&
            old.color.length >= 2
          ) {
            undoElement.style.visibility = "visible"; //履歴が2つ以上ならUndo機能を有効化
          }
          historyBody.scroll(
            0,
            historyBody.scrollHeight - historyBody.clientHeight //履歴表示エリアを下までスクロール
          );
          getHistoryLength();
          removeDisableSet();
        }
      }, 300);
    }
  }