var history,max,select;
document.addEventListener("DOMContentLoaded", function () {
  resize();
  if (localStorage.getItem('history')) {
    
  }
  
});
window.addEventListener("resize", function () {
  resize();
});
document.addEventListener("DOMContentLoaded", function () {
  var range = document.getElementById("bingoMax");
  var rangeText = document.getElementById("bingoMaxText");
  range.addEventListener("input", function () {
    rangeText.value = range.value;
  });
  rangeText.addEventListener("input", function () {
    range.value = rangeText.value;
  });
});
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
