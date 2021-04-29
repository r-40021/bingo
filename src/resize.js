export function resize() {
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
export function flex() {
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