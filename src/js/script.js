document.addEventListener("DOMContentLoaded", function () {
  resize();
});
document.addEventListener("resize", function () {
  resize();
});
function resize() {
  var numberElement = document.getElementById("bingoNumber");
  var bodyElement = document.getElementById("body");
  if (numberElement.offsetHeight > bodyElement.offsetHeight) {
    numberElement.style.height = "90%";  
    numberElement.style.width = numberElement.offsetHeight + "px";
  } else {
    numberElement.style.height = numberElement.offsetWidth + "px";
  }
  numberElement.style.fontSize = (numberElement.offsetHeight / 3) * 2 + "px";
}
