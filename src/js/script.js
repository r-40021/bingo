var max = 75;
var myHistory = [];
var select = [];
var colorList = ["#ffa500", "#d3e15c", "#b384c7", "#F06060", "#a9ceec"];
document.addEventListener("DOMContentLoaded", function () {
  if (storageAvailable("localStorage")) {
  } else {
    alert("お使いの環境では、保存機能はご利用になれません。"); //Localstorageが利用不可のとき
  }
  resize();
  //読み込み
  if (localStorage.getItem("myHistory")) {
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
    historyBody.scroll(0, historyBody.scrollHeight - historyBody.clientHeight);
  }
  if (localStorage.getItem("max")) {
    max = Number(localStorage.getItem("max"));
    document.getElementById("bingoMax").value = max;
    document.getElementById("bingoMaxText").value = max;
  }
  if (localStorage.getItem("lastColor")) {
    document.getElementById("bingoNumber").style.borderColor = colorList[Number(localStorage.getItem("lastColor"))];
  }
  addSelect();
  removeDisableSet();
});
window.addEventListener("resize", function () {
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
  });
});
function spin() {
  //シャッフル
  if (select.length <= 0) {
    var endModal = new bootstrap.Modal(document.getElementById("end-modal"));
    endModal.show();
  } else {
    makeDisableSet();
    var count = 0;
    var numberElement = document.getElementById("bingoNumber");
    var stop = Math.floor(Math.random() * (12 - 5) + 5);
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
        historyBody.scroll(
          0,
          historyBody.scrollHeight - historyBody.clientHeight
        );
        removeDisableSet();
      }
    }, 325);
  }
}

function resize() {
  //レイアウトの調整
  var numberElement = document.getElementById("bingoNumber");
  var wrapElement = document.getElementById("number-wrap");
  if (wrapElement.clientHeight > wrapElement.clientWidth) {
    numberElement.style.width = "90%";
    numberElement.style.height = numberElement.offsetWidth + "px";
  } else {
    numberElement.style.height = "90%";
    numberElement.style.width = numberElement.offsetHeight + "px";
  }
  numberElement.style.fontSize = (numberElement.offsetHeight / 5) * 3 + "px";
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
  //リセット
  makeDisableSet();
  localStorage.removeItem("myHistory");
  localStorage.removeItem("lastColor");
  document.getElementById("number-inner").innerHTML = null;
  document.getElementById("history-body").innerHTML = null;
  document.getElementById("bingoNumber").style.borderColor = colorList[0];
  myHistory = [];
  select = [];
  addSelect();
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
