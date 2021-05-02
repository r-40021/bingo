/*変数の定義*/
var max = 75; //最大値
var myHistory = []; //履歴
var select = []; //ビンゴの数字候補
var colorList = ["#ffa500", "#d3e15c", "#b384c7", "#F06060", "#a9ceec"]; //数字表示エリアの枠線色
var old = new Object(); //Undoボタン用のオブジェクト
old.max = []; //過去の最大値を記録（キャッシュしない）
old.number = []; //過去に出た数字を記録（キャッシュしない）
old.color = []; //過去の枠線色を記録（キャッシュしない）
let anime; //テーマ変更時のアニメーション(timeout)
let themeStatus; //テーマがユーザー設定(1)なのか否か(0)
/*Dark Theme*/
const isDark = window.matchMedia("(prefers-color-scheme: dark)");
var loadingTimeout;
document.addEventListener("DOMContentLoaded", function () {
  loadingTimeout = setTimeout(() => {
    // 10秒後ローディング強制解除
    document.getElementById("fixed").classList.add("loaded");
    document.getElementById("loading").classList.add("loaded");
  }, 10000);
});
document.addEventListener("DOMContentLoaded", function () {
  // ローディング解除
  window.addEventListener("load", () => {
    clearTimeout(loadingTimeout);
    document.getElementById("fixed").classList.add("loaded");
    document.getElementById("loading").classList.add("loaded");
  });
});
document.addEventListener("DOMContentLoaded", function () {
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
  if (localStorage.getItem("theme") === "dark") {
    // ローカルストレージを読み込み、テーマを反映
    toggleTheme("d");
  } else if (localStorage.getItem("theme") === "light") {
    toggleTheme("l");
  } else if (localStorage.getItem("theme") === "auto") {
    toggleTheme("a");
  } else {
    toggleTheme(isDark);
  }
  if (localStorage.getItem("myHistory")) {
    /*履歴読み込み*/
    if (JSON.parse(localStorage.getItem("myHistory")).length >= 1) {
      var his = localStorage.getItem("myHistory");
      myHistory = JSON.parse(his);
      var historyBody = document.getElementById("history-body");
      for (let i = 0; i < myHistory.length; i++) {
        var div = document.createElement("div"); //HTMLに代入　それぞれにdiv要素を作成している
        div.className = "history-number";
        div.innerHTML = myHistory[i];
        historyBody.appendChild(div);
      }
      document.getElementById("number-inner").innerHTML =
        myHistory[myHistory.length - 1];
      old.number.unshift(Number(myHistory[myHistory.length - 1]));
      historyBody.scroll(
        0,
        historyBody.scrollHeight - historyBody.clientHeight //履歴表示エリアを一番下までスクロール
      );
    }
  }
  if (localStorage.getItem("max")) {
    /*最大値取得*/
    max = Number(localStorage.getItem("max"));
    document.getElementById("bingoMax").value = max;
    document.getElementById("bingoMaxText").value = max;
    old.max.unshift(Number(max));
  }
  if (localStorage.getItem("lastColor")) {
    /*最後の色を取得*/
    document.getElementById("bingoNumber").style.borderColor =
      colorList[Number(localStorage.getItem("lastColor"))];
    old.color.unshift(Number(localStorage.getItem("lastColor")));
  }
  addSelect();
  getHistoryLength();
  removeDisableSet(); //フッターを選択可能に
});
window.addEventListener("resize", function () {
  flex();
  resize(); //レイアウト調整
});
document.addEventListener("DOMContentLoaded", function () {
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
try {
  //システムのテーマが変更されたときに発動
  // Chrome & Firefox
  isDark.addEventListener("change", toggleTheme);
} catch (e1) {
  try {
    // Safari
    isDark.addListener(toggleTheme);
  } catch (e2) {
    console.error(e2);
  }
}
function spin() {
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
function resize() {
  //レイアウトの調整
  var numberElement = document.getElementById("bingoNumber");
  var wrapElement = document.getElementById("number-wrap");
  var historyElement = document.getElementById("history-body"); //要素を変数に代入
  if (wrapElement.clientHeight >= wrapElement.clientWidth) {
    numberElement.style.width = "90%";
    numberElement.style.height = numberElement.offsetWidth + "px"; //数字を表示するエリアを正方形に
  } else {
    numberElement.style.height = "90%";
    numberElement.style.width = numberElement.offsetHeight + "px";
  }
  numberElement.style.fontSize = (numberElement.offsetHeight / 5) * 3 + "px"; //数字表示エリアのフォントサイズを指定
  numberElement.style.borderWidth = numberElement.offsetHeight * 0.1 + "px"; //数字表示エリアの枠線の太さを指定
  if (window.innerWidth <= 576) {
    historyElement.style.fontSize =
      ((historyElement.clientWidth * 0.12) / 3) * 2 + "px";
  } else {
    historyElement.style.fontSize =
      ((historyElement.clientWidth * 0.09) / 3) * 2 + "px";
  }
  document.getElementById("privacy-iframe-wrap").style.width =
    document.getElementById("privacyModalBody").clientWidth - 40 + "px";
  document.getElementById("privacy-iframe-wrap").style.height =
    document.getElementById("privacyModalBody").clientHeight - 40 + "px";
}
function addSelect() {
  select = []; //ビンゴの数字の候補
  /*==========
  select(ビンゴの数字の候補を保存するリスト)=max(最大値)までのすべての数-myHistory(履歴)
  for文を用いて、1からmax(設定した最大値)までの数字が履歴に含まれているかを確認。
  もし、履歴に含まれていなければselectに追加。
  この処理に時間がかからないよう、max(最大値)は99までに制限している。
  ==========*/
  localStorage.setItem("max", max);
  for (let i = 0; i < max; i++) {
    if (myHistory.indexOf(i + 1) === -1 && select.indexOf(i + 1) === -1) {
      select.push(i + 1);
    }
  }
}
function makeDisable(element) {
  //指定した要素(element)を選択不可にする
  document.getElementById(element).setAttribute("disabled", null);
}
function makeDisableSet() {
  //「指定した要素(element)を選択不可にする」処理を、楽ちんなセットにしました。
  makeDisable("spin");
  makeDisable("reset");
  makeDisable("bingoMax");
  makeDisable("bingoMaxText");
}
function removeDisable(element) {
  //指定した要素(element)を選択可能にする
  document.getElementById(element).removeAttribute("disabled");
}
function removeDisableSet() {
  //「指定した要素(element)を選択可能にする」処理を、うれしいセットにしました。
  removeDisable("spin");
  removeDisable("reset");
  removeDisable("bingoMax");
  removeDisable("bingoMaxText");
  document.getElementById("spin").focus();
}
function resetAsk() {
  //履歴をリセットしてもいいか、尋ねる
  new bootstrap.Modal(document.getElementById("reset-modal")).show();
}
function reset() {
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
function storageAvailable(type) {
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
function flex() {
  /*スマホのURLバーに隠されないように、body部分の高さを調整*/
  var height = window.innerHeight;
  document.getElementsByClassName("fixed")[0].style.height = height + "px";
  document.body.style.height = height + "px";
}
var checkedTimeout;
function copy() {
  /*URLコピー*/
  clearTimeout(checkedTimeout);
  var url = location.href;
  navigator.clipboard.writeText(url);
  document.getElementById("checked-icon").style.display = "inline";
  document.getElementById("url-icon").style.display = "none"; //チェックアイコンを表示
  checkedTimeout = setTimeout(() => {
    /*10秒後、元に戻す*/
    document.getElementById("checked-icon").style.display = "none";
    document.getElementById("url-icon").style.display = "inline";
  }, 10000);
}
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
function undo() {
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
function startOver() {
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
function getHistoryLength() {
  //履歴の数を取得し、HTMLに出力
  document.getElementById("historyLength").innerText = myHistory.length;
}
document.getElementById("privacy").addEventListener("shown.bs.modal", () => {
  let iframeElement = document.getElementById("privacy-iframe").contentWindow;
  iframeElement.location.href = "https://r-40021.github.io/privacy.html";
  resize(); //レイアウト調整処理
});
function toggleTheme(mql) {
  clearInterval(anime); //1秒後にbodyのトランジョン解除のタイマーを解除
  document.body.classList.add("anime"); //bodyのトランジョンを有効化
  let auto = document.getElementById("auto"); //「システムに従う」ボタン
  let light = document.getElementById("light"); //「ライトモード」ボタン
  let dark = document.getElementById("dark"); //「ダークモード」ボタン
  if (themeStatus) {
    // ユーザーがボタンを押した(2回目以降)
    if (mql === "d") {
      // 「ダークモード」選択時
      document.body.classList.add("dark"); //ダークモードにする
      changeIcon("dark"); //フッターのアイコンを変更
      noActive();
      dark.classList.add("active"); //選択中のボタンを目立たせる
      localStorage.setItem("theme", "dark"); //Local Storageに保存
    } else if (mql === "l") {
      // 「ライトモード」選択時
      document.body.classList.remove("dark"); //ダークモード解除
      changeIcon("light"); //フッターのアイコンを変更
      noActive();
      light.classList.add("active"); //選択中のボタンを目立たせる
      localStorage.setItem("theme", "light"); //Local Storageに保存
    } else if (mql === "a") {
      // 「システムに任せる」選択時
      if (isDark.matches) {
        /* ダークテーマの時 */
        document.body.classList.add("dark"); //ダークモードにする
        changeIcon("dark"); //フッターのアイコンを変更
        localStorage.setItem("theme", "auto"); //Local Storageに保存
      } else {
        /* ライトテーマの時 */
        document.body.classList.remove("dark");
        changeIcon("light");
        localStorage.setItem("theme", "auto"); //Local Storageに保存
      }
      noActive();
      auto.classList.add("active"); //選択中のボタンを目立たせる
    }
  } else {
    /*現時点でオート設定の時*/
    if ((isDark.matches || mql === "d") && mql !== "l") {
      /* ダークテーマの時 */
      document.body.classList.add("dark"); //ダークモードにする
      changeIcon("dark"); //フッターのアイコンを変更
      if (mql === "d") {
        noActive();
        dark.classList.add("active"); //選択中のボタンを目立たせる
        localStorage.setItem("theme", "dark"); //Local Storageに保存
      } else {
        localStorage.setItem("theme", "auto"); //Local Storageに保存
      }
    } else {
      /* ライトテーマの時 */
      document.body.classList.remove("dark"); //ダークモード解除
      changeIcon("light"); //フッターのアイコンを変更
      if (mql === "l") {
        noActive();
        light.classList.add("active"); //選択中のボタンを目立たせる
        localStorage.setItem("theme", "light"); //Local Storageに保存
      } else {
        localStorage.setItem("theme", "auto"); //Local Storageに保存
      }
    }
  }
  if (mql === "d" || mql === "l") {
    themeStatus = 1; //手動でダークorライト
  } else if (mql === "a") {
    themeStatus = 0; //システムに従うを選択時
  }
  anime = setInterval(() => {
    document.body.classList.remove("anime");
  }, 1000); //1秒後、bodyのトランジョンを解除
  function changeIcon(type) {
    let elementsList = document.getElementsByClassName("themeIcon");
    let classList = ["bi-sun", "bi-moon-fill"];
    if (type === "dark") {
      for (let i = 0; i < elementsList.length; i++) {
        const element = elementsList[i];
        element.classList.replace(classList[0], classList[1]);
      }
    } else {
      for (let i = 0; i < elementsList.length; i++) {
        const element = elementsList[i];
        element.classList.replace(classList[1], classList[0]);
      }
    }
  }
}
function noActive() {
  //すべてのボタンを非アクティブにする
  let list = document.querySelectorAll("#theme .list-group-item");
  list.forEach(function (element) {
    element.classList.remove("active");
  });
}
