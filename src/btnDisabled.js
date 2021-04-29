export function makeDisable(element) {
    //指定した要素(element)を選択不可にする
    document.getElementById(element).setAttribute("disabled", null);
  }
export function makeDisableSet() {
    //「指定した要素(element)を選択不可にする」処理を、楽ちんなセットにしました。
    makeDisable("spin");
    makeDisable("reset");
    makeDisable("bingoMax");
    makeDisable("bingoMaxText");
  }
export function removeDisable(element) {
    //指定した要素(element)を選択可能にする
    document.getElementById(element).removeAttribute("disabled");
  }
export function removeDisableSet() {
    //「指定した要素(element)を選択可能にする」処理を、うれしいセットにしました。
    removeDisable("spin");
    removeDisable("reset");
    removeDisable("bingoMax");
    removeDisable("bingoMaxText");
    document.getElementById("spin").focus();
  }