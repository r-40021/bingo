var max = 75;
var myHistory = [];
var select = [];
var colorList = ["#ffa500", "#d3e15c", "#b384c7", "#F06060", "#a9ceec"];
document.addEventListener("DOMContentLoaded", function () {
  resize();
  if (localStorage.getItem("myHistory")) {
    myHistory = localStorage.getItem("myHistory");
  }
  if (localStorage.getItem("max")) {
    max = Number(localStorage.getItem("max"));
    document.getElementById("bingoMax").value = max;
    document.getElementById("bingoMaxText").value = max;
  }
  addSelect();
});
window.addEventListener("resize", function () {
  resize();
});
document.addEventListener("DOMContentLoaded", function () {
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
    if (rangeText.value < 1) {
      rangeText.value = 1;
    }
    if (rangeText.value > 99) {
      rangeText.value = 99;
    }
  });
});
function spin() {
  if (select.length <= 0) {
    var endModal = new bootstrap.Modal(document.getElementById("end-modal"));
    endModal.show();
  } else {
    makeDisable("spin");
    makeDisable("reset");
    makeDisable("bingoMax");
    makeDisable("bingoMaxText");
    makeDisable("formFileSm");
    var count = 0;
    var numberElement = document.getElementById("bingoNumber");
    var stop = Math.floor(Math.random() * (15 - 5) + 5);
    var historyBody = document.getElementById("history-body");
    var spin = setInterval(() => {
      var index = Math.floor(Math.random() * select.length);
      var display = select[index];
      document.getElementById("number-inner").innerHTML = display;
      numberElement.style.borderColor = colorList[count % colorList.length];
      count++;
      if (count >= stop) {
        clearInterval(spin);
        var div = document.createElement("div");
        div.className = "history-number";
        div.innerHTML = display;
        myHistory.push(display);
        select.splice(select.indexOf(display), 1);
        historyBody.appendChild(div);
        historyBody.scroll(
          0,
          historyBody.scrollHeight - historyBody.clientHeight
        );
        removeDisable("spin");
        removeDisable("reset");
        removeDisable("bingoMax");
        removeDisable("bingoMaxText");
        removeDisable("formFileSm");
        document.getElementById("spin").focus();
      }
    }, 100);
  }
}

function resize() {
  var numberElement = document.getElementById("bingoNumber");
  var wrapElement = document.getElementById("number-wrap");
  if (wrapElement.clientHeight > wrapElement.clientWidth) {
    numberElement.style.width = "90%";
    numberElement.style.height = numberElement.offsetWidth + "px";
  } else {
    numberElement.style.height = "90%";
    numberElement.style.width = numberElement.offsetHeight + "px";
  }
  numberElement.style.fontSize = (numberElement.offsetHeight / 3) * 2 + "px";
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
function removeDisable(element) {
  document.getElementById(element).removeAttribute("disabled");
}
