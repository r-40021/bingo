import {max, old, changeVar, pushList, unshiftList, deleteList} from "./index";
import {addSelect} from "./check";
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