var max = 75;
var myHistory = [];
var select = [];
var colorList = ["#ffa500", "#d3e15c", "#b384c7", "#F06060", "#a9ceec"];
var old = new Object();
old.max = [];
old.number = [];
old.color = [];
document.addEventListener("DOMContentLoaded", function () {
  if (storageAvailable("localStorage")) {
  } else {
    alert("お使いの環境では、保存機能はご利用になれません。"); //Localstorageが利用不可のとき
  }
  if (window.navigator.userAgent.toLowerCase().indexOf("android") !== -1) {
    var elements = document.getElementsByClassName("shareIcon");
    for (let i = 0; i < elements.length; i++) {
      elements[i].classList.replace("bi-box-arrow-up", "bi-share");
    }
  }
  flex();
  resize();
  //読み込み
  if (localStorage.getItem("myHistory")) {
    if (JSON.parse(localStorage.getItem("myHistory")).length >= 1) {
      var his = localStorage.getItem("myHistory");
      myHistory = JSON.parse(his);
      var historyBody = document.getElementById("history-body");
      for (let i = 0; i < myHistory.length; i++) {
        var div = document.createElement("div");
        div.className = "history-number";
        div.innerHTML = myHistory[i];
        historyBody.appendChild(div);
      }
      document.getElementById("number-inner").innerHTML =
        myHistory[myHistory.length - 1];
      old.number.unshift(myHistory[myHistory.length - 1]);
      historyBody.scroll(
        0,
        historyBody.scrollHeight - historyBody.clientHeight
      );
    }
  }
  if (localStorage.getItem("max")) {
    max = Number(localStorage.getItem("max"));
    document.getElementById("bingoMax").value = max;
    document.getElementById("bingoMaxText").value = max;
    old.max.unshift(max);
  }
  if (localStorage.getItem("lastColor")) {
    document.getElementById("bingoNumber").style.borderColor =
      colorList[Number(localStorage.getItem("lastColor"))];
    old.color.unshift(Number(localStorage.getItem("lastColor")));
  }
  addSelect();
  getHistoryLength();
  removeDisableSet();
});
window.addEventListener("resize", function () {
  flex();
  resize();
});
document.addEventListener("DOMContentLoaded", function () {
  //レンジとテキストボックスを連動
  var range = document.getElementById("bingoMax");
  var rangeText = document.getElementById("bingoMaxText");
  range.addEventListener("input", function () {
    rangeText.value = range.value;
    max = range.value;
    addSelect();
  });
  rangeText.addEventListener("input", function () {
    range.value = rangeText.value;
    max = range.value;
    addSelect();
  });
  rangeText.addEventListener("change", function () {
    if (rangeText.value < 1) {
      rangeText.value = 1;
    }
    if (rangeText.value > 99) {
      rangeText.value = 99;
    }
    range.value = rangeText.value;
    max = range.value;
    addSelect();
  });
});
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
        clearInterval(spin);
        var div = document.createElement("div");
        div.className = "history-number";
        div.innerHTML = display;
        myHistory.push(display);
        localStorage.setItem("myHistory", JSON.stringify(myHistory));
        localStorage.setItem("lastColor", colorIndex);
        select.splice(select.indexOf(display), 1);
        historyBody.appendChild(div);
        old.max.unshift(max);
        old.number.unshift(display);
        old.color.unshift(colorIndex);
        if (
          old.number.length >= 2 &&
          old.max.length >= 2 &&
          old.color.length >= 2
        ) {
          undoElement.style.visibility = "visible";
        }
        historyBody.scroll(
          0,
          historyBody.scrollHeight - historyBody.clientHeight
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
  var historyElement = document.getElementById("history-body");
  if (wrapElement.clientHeight > wrapElement.clientWidth) {
    numberElement.style.width = "90%";
    numberElement.style.height = numberElement.offsetWidth + "px";
  } else {
    numberElement.style.height = "90%";
    numberElement.style.width = numberElement.offsetHeight + "px";
  }
  numberElement.style.fontSize = (numberElement.offsetHeight / 5) * 3 + "px";
  numberElement.style.borderWidth = numberElement.offsetHeight * 0.1 + "px";
  if (window.innerWidth <= 576) {
    historyElement.style.fontSize =
      ((historyElement.clientWidth * 0.12) / 3) * 2 + "px";
  } else {
    historyElement.style.fontSize =
      ((historyElement.clientWidth * 0.1) / 3) * 2 + "px";
  }
}
function addSelect() {
  select = [];
  localStorage.setItem("max", max);
  for (let i = 0; i < max; i++) {
    if (myHistory.indexOf(i + 1) === -1) {
      select.push(i + 1);
    }
  }
}
function makeDisable(element) {
  document.getElementById(element).setAttribute("disabled", null);
}
function makeDisableSet() {
  makeDisable("spin");
  makeDisable("reset");
  makeDisable("bingoMax");
  makeDisable("bingoMaxText");
}
function removeDisable(element) {
  document.getElementById(element).removeAttribute("disabled");
}
function removeDisableSet() {
  removeDisable("spin");
  removeDisable("reset");
  removeDisable("bingoMax");
  removeDisable("bingoMaxText");
  document.getElementById("spin").focus();
}
function resetAsk() {
  new bootstrap.Modal(document.getElementById("reset-modal")).show();
}
function reset() {
  document.getElementById("undo").style.visibility = "hidden";
  document.getElementById("startOver").style.visibility = "hidden";
  //リセット
  makeDisableSet();
  localStorage.removeItem("myHistory");
  localStorage.removeItem("lastColor");
  document.getElementById("number-inner").innerHTML = null;
  document.getElementById("history-body").innerHTML = null;
  document.getElementById("bingoNumber").style.borderColor = colorList[0];
  myHistory = [];
  select = [];
  old = new Object();
  old.max = [];
  old.number = [];
  old.color = [];
  console.log(old);
  addSelect();
  getHistoryLength();
  removeDisableSet();
}
function storageAvailable(type) {
  //localStorageが利用可能かチェック
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
  /*スマホのURLバーに隠されないように*/
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
  document.getElementById("url-icon").style.display = "none";
  checkedTimeout = setTimeout(() => {
    document.getElementById("checked-icon").style.display = "none";
    document.getElementById("url-icon").style.display = "inline";
  }, 10000);
}
if ("serviceWorker" in navigator) {
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
  var numberElements = document.getElementsByClassName("history-number");
  var removeNumber = numberElements[numberElements.length - 1];
  removeNumber.remove();
  myHistory.splice(myHistory.indexOf(removeNumber.innerHTML), 1);
  document.getElementById("number-inner").innerHTML = old.number[1];
  document.getElementById("bingoNumber").style.borderColor =
    colorList[old.color[1]];
  max = old.max[1];
  document.getElementById("bingoMax").value = max;
  document.getElementById("bingoMaxText").value = max;
  select.push(removeNumber.innerHTML);
  localStorage.setItem("myHistory", JSON.stringify(myHistory));
  localStorage.setItem("max", old.max[1]);
  localStorage.setItem("lastColor", old.color[1]);
  document.getElementById("undo").style.visibility = "hidden";
  document.getElementById("startOver").style.visibility = "visible";
  getHistoryLength();
  document.getElementById("spin").focus();
}
function startOver() {
  var historyBody = document.getElementById("history-body");
  var div = document.createElement("div");
  var oldNumber = old.number[0];
  div.className = "history-number";
  div.innerHTML = oldNumber;
  historyBody.appendChild(div);
  select.splice(myHistory.indexOf(oldNumber), 1);
  document.getElementById("number-inner").innerHTML = oldNumber;
  document.getElementById("bingoNumber").style.borderColor =
    colorList[old.color[0]];
  max = old.max[0];
  document.getElementById("bingoMax").value = max;
  document.getElementById("bingoMaxText").value = max;
  myHistory.push(oldNumber);
  localStorage.setItem("myHistory", JSON.stringify(myHistory));
  localStorage.setItem("max", old.max[0]);
  localStorage.setItem("lastColor", old.color[0]);
  document.getElementById("undo").style.visibility = "visible";
  document.getElementById("startOver").style.visibility = "hidden";
  getHistoryLength();
  document.getElementById("spin").focus();
}
function getHistoryLength() {
  document.getElementById("historyLength").innerText = myHistory.length;
}
