var history, max, select;
var colorList = ["#ffa500","#d3e15c","#b384c7","#F06060","#a9ceec"];
document.addEventListener("DOMContentLoaded", function () {
  resize();
  if (localStorage.getItem("history")) {
    history = localStorage.getItem("history");
  }
  if (localStorage.getItem("max")) {
    max = localStorage.getItem("max");
    document.getElementById("bingoMax").value = max;
    document.getElementById("bingoMaxText").value = max;
  }
});
window.addEventListener("resize", function () {
  resize();
});
document.addEventListener("DOMContentLoaded", function () {
  max = 75;
  var range = document.getElementById("bingoMax");
  var rangeText = document.getElementById("bingoMaxText");
  range.addEventListener("input", function () {
    rangeText.value = range.value;
    max = range.value;
  });
  rangeText.addEventListener("input", function () {
    range.value = rangeText.value;
    max = range.value;
  });
});
function spin() {
  var count = 0;
  var numberElement = document.getElementById("bingoNumber");
  var stop = Math.floor(Math.random() * (20 - 5) + 5);
  var historyBody = document.getElementById("history-body");
  var spin = setInterval(() => {
    var min = Math.ceil(1);
    max = Math.floor(max);
    var display = Math.floor(Math.random() * (max - min) + min);
    document.getElementById("number-inner").innerHTML = display;
    numberElement.style.borderColor = colorList[count % colorList.length];
    count++;
    if (count >= stop) {
      clearInterval(spin);
      var div = document.createElement("div");
      div.className = "history-number";
      div.innerHTML = display;
      historyBody.appendChild(div);
      historyBody.scroll(0, historyBody.scrollHeight - historyBody.clientHeight);
    }
  }, 100);
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
