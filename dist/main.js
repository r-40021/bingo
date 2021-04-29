/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/check.js":
/*!**********************!*\
  !*** ./src/check.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"checking\": () => (/* binding */ checking),\n/* harmony export */   \"addSelect\": () => (/* binding */ addSelect),\n/* harmony export */   \"storageAvailable\": () => (/* binding */ storageAvailable)\n/* harmony export */ });\nfunction checking() {\n    if (storageAvailable(\"localStorage\")) {\n    } else {\n      alert(\"お使いの環境では、保存機能はご利用になれません。\"); //Localstorageが利用不可のとき\n    }\n    if (window.navigator.userAgent.toLowerCase().indexOf(\"android\") !== -1) {\n      /*Androidのときに「共有」アイコンを変化*/\n      var elements = document.getElementsByClassName(\"shareIcon\");\n      for (let i = 0; i < elements.length; i++) {\n        elements[i].classList.replace(\"bi-box-arrow-up\", \"bi-share\");\n      }\n    }\n    flex();\n    resize(); //レイアウト調整処理\n    //読み込み\n    if (localStorage.getItem(\"myHistory\")) {\n      /*履歴読み込み*/\n      if (JSON.parse(localStorage.getItem(\"myHistory\")).length >= 1) {\n        var his = localStorage.getItem(\"myHistory\");\n        myHistory = JSON.parse(his);\n        var historyBody = document.getElementById(\"history-body\");\n        for (let i = 0; i < myHistory.length; i++) {\n          var div = document.createElement(\"div\"); //HTMLに代入　それぞれにdiv要素を作成している\n          div.className = \"history-number\";\n          div.innerHTML = myHistory[i];\n          historyBody.appendChild(div);\n        }\n        document.getElementById(\"number-inner\").innerHTML =\n          myHistory[myHistory.length - 1];\n        old.number.unshift(Number(myHistory[myHistory.length - 1]));\n        historyBody.scroll(\n          0,\n          historyBody.scrollHeight - historyBody.clientHeight //履歴表示エリアを一番下までスクロール\n        );\n      }\n    }\n    if (localStorage.getItem(\"max\")) {\n      /*最大値取得*/\n      max = Number(localStorage.getItem(\"max\"));\n      document.getElementById(\"bingoMax\").value = max;\n      document.getElementById(\"bingoMaxText\").value = max;\n      old.max.unshift(Number(max));\n    }\n    if (localStorage.getItem(\"lastColor\")) {\n      /*最後の色を取得*/\n      document.getElementById(\"bingoNumber\").style.borderColor =\n        colorList[Number(localStorage.getItem(\"lastColor\"))];\n      old.color.unshift(Number(localStorage.getItem(\"lastColor\")));\n    }\n    addSelect();\n    getHistoryLength();\n    removeDisableSet(); //フッターを選択可能に\n  }\nfunction addSelect() {\n    select = []; //ビンゴの数字の候補\n    /*==========\n    select(ビンゴの数字の候補を保存するリスト)=max(最大値)までのすべての数-myHistory(履歴)\n    for文を用いて、1からmax(設定した最大値)までの数字が履歴に含まれているかを確認。\n    もし、履歴に含まれていなければselectに追加。\n    この処理に時間がかからないよう、max(最大値)は99までに制限している。\n    ==========*/\n    localStorage.setItem(\"max\", max);\n    for (let i = 0; i < max; i++) {\n      if (myHistory.indexOf(i + 1) === -1 && select.indexOf(i + 1) === -1) {\n        select.push(i + 1);\n      }\n    }\n  }\nfunction storageAvailable(type) {\n    //localStorageが利用可能かチェック(引用:https://developer.mozilla.org/ja/docs/Web/API/Web_Storage_API/Using_the_Web_Storage_API#testing_for_availability)\n    var storage;\n    try {\n      storage = window[type];\n      var x = \"__storage_test__\";\n      storage.setItem(x, x);\n      storage.removeItem(x);\n      return true;\n    } catch (e) {\n      return (\n        e instanceof DOMException &&\n        // everything except Firefox\n        (e.code === 22 ||\n          // Firefox\n          e.code === 1014 ||\n          // test name field too, because code might not be present\n          // everything except Firefox\n          e.name === \"QuotaExceededError\" ||\n          // Firefox\n          e.name === \"NS_ERROR_DOM_QUOTA_REACHED\") &&\n        // acknowledge QuotaExceededError only if there's something already stored\n        storage &&\n        storage.length !== 0\n      );\n    }\n  }\n\n//# sourceURL=webpack://bingo/./src/check.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _load__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./load */ \"./src/load.js\");\n/* harmony import */ var _check__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./check */ \"./src/check.js\");\n/* harmony import */ var _resize__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./resize */ \"./src/resize.js\");\n/*変数の定義*/\nvar max = 75; //最大値\nvar myHistory = []; //履歴\nvar select = []; //ビンゴの数字候補\nvar colorList = [\"#ffa500\", \"#d3e15c\", \"#b384c7\", \"#F06060\", \"#a9ceec\"]; //数字表示エリアの枠線色\nvar old = new Object(); //Undoボタン用のオブジェクト\nold.max = []; //過去の最大値を記録（キャッシュしない）\nold.number = []; //過去に出た数字を記録（キャッシュしない）\nold.color = []; //過去の枠線色を記録（キャッシュしない）\nvar loadingTimeout;\n\nwindow.addEventListener(\"load\", _load__WEBPACK_IMPORTED_MODULE_0__.loading, false);\nwindow.addEventListener(\"load\", _load__WEBPACK_IMPORTED_MODULE_0__.myTimeOut, false);\n\nwindow.addEventListener(\"load\", _check__WEBPACK_IMPORTED_MODULE_1__.checking, false);\n\nwindow.addEventListener(\"resize\", function () {\n  (0,_resize__WEBPACK_IMPORTED_MODULE_2__.flex)();\n  (0,_resize__WEBPACK_IMPORTED_MODULE_2__.resize)(); //レイアウト調整\n});\nwindow.addEventListener(\"DOMContentLoaded\", function () {\n  //レンジとテキストボックスを連動\n  var range = document.getElementById(\"bingoMax\");\n  var rangeText = document.getElementById(\"bingoMaxText\");\n  range.addEventListener(\"input\", function () {\n    rangeText.value = range.value;\n    max = Number(range.value);\n    old.max[0] = max;\n    (0,_check__WEBPACK_IMPORTED_MODULE_1__.addSelect)();\n  });\n  rangeText.addEventListener(\"input\", function () {\n    range.value = rangeText.value;\n    max = Number(range.value);\n    old.max[0] = max;\n    (0,_check__WEBPACK_IMPORTED_MODULE_1__.addSelect)();\n  });\n  rangeText.addEventListener(\"change\", function () {\n    /*1~99以外の数字が入力されたときの処理*/\n    if (rangeText.value < 1) {\n      rangeText.value = 1; //1未満なら1にする\n    }\n    if (rangeText.value > 99) {\n      rangeText.value = 99; //99より大きれば99にする\n    }\n    range.value = rangeText.value;\n    max = Number(range.value);\n    old.max[0] = max;\n    (0,_check__WEBPACK_IMPORTED_MODULE_1__.addSelect)(); //ビンゴの候補のリストを更新\n  });\n});\n\n\nif (\"serviceWorker\" in navigator) {\n  /*Service Worker登録\n  (引用:https://developers.google.com/web/fundamentals/primers/service-workers)*/\n  window.addEventListener(\"load\", function () {\n    navigator.serviceWorker.register(\"sw.js\").then(\n      function (registration) {\n        // Registration was successful\n        console.log(\n          \"ServiceWorker registration successful with scope: \",\n          registration.scope\n        );\n      },\n      function (err) {\n        // registration failed :(\n        console.log(\"ServiceWorker registration failed: \", err);\n      }\n    );\n  });\n}\n\nfunction getHistoryLength() {\n  //履歴の数を取得し、HTMLに出力\n  document.getElementById(\"historyLength\").innerText = myHistory.length;\n}\ndocument.getElementById(\"privacy\").addEventListener(\"shown.bs.modal\", () => {\n  let iframeElement = document.getElementById(\"privacy-iframe\").contentWindow;\n  iframeElement.location.href = \"https://r-40021.github.io/privacy.html\";\n  (0,_resize__WEBPACK_IMPORTED_MODULE_2__.resize)(); //レイアウト調整処理\n});\nfunction openPage(url){\n  window.open(url);\n}\n\n//# sourceURL=webpack://bingo/./src/index.js?");

/***/ }),

/***/ "./src/load.js":
/*!*********************!*\
  !*** ./src/load.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"loading\": () => (/* binding */ loading),\n/* harmony export */   \"myTimeOut\": () => (/* binding */ myTimeOut)\n/* harmony export */ });\nfunction loading() {\n    loadingTimeout = setTimeout(() => {\n      document.getElementById(\"fixed\").classList.add(\"loaded\");\n      document.getElementById(\"loading\").classList.add(\"loaded\");\n    }, 10000);\n  }\nfunction myTimeOut() {\n    window.addEventListener(\"load\", () => {\n      clearTimeout(loadingTimeout);\n      document.getElementById(\"fixed\").classList.add(\"loaded\");\n      document.getElementById(\"loading\").classList.add(\"loaded\");\n    });\n  }\n\n//# sourceURL=webpack://bingo/./src/load.js?");

/***/ }),

/***/ "./src/resize.js":
/*!***********************!*\
  !*** ./src/resize.js ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"resize\": () => (/* binding */ resize),\n/* harmony export */   \"flex\": () => (/* binding */ flex)\n/* harmony export */ });\nfunction resize() {\n    //レイアウトの調整\n    var numberElement = document.getElementById(\"bingoNumber\");\n    var wrapElement = document.getElementById(\"number-wrap\");\n    var historyElement = document.getElementById(\"history-body\"); //要素を変数に代入\n    if (wrapElement.clientHeight >= wrapElement.clientWidth) {\n      numberElement.style.width = \"90%\";\n      numberElement.style.height = numberElement.offsetWidth + \"px\"; //数字を表示するエリアを正方形に\n    } else {\n      numberElement.style.height = \"90%\";\n      numberElement.style.width = numberElement.offsetHeight + \"px\";\n    }\n    numberElement.style.fontSize = (numberElement.offsetHeight / 5) * 3 + \"px\"; //数字表示エリアのフォントサイズを指定\n    numberElement.style.borderWidth = numberElement.offsetHeight * 0.1 + \"px\"; //数字表示エリアの枠線の太さを指定\n    if (window.innerWidth <= 576) {\n      historyElement.style.fontSize =\n        ((historyElement.clientWidth * 0.12) / 3) * 2 + \"px\";\n    } else {\n      historyElement.style.fontSize =\n        ((historyElement.clientWidth * 0.09) / 3) * 2 + \"px\";\n    }\n    document.getElementById(\"privacy-iframe-wrap\").style.width =\n      document.getElementById(\"privacyModalBody\").clientWidth - 40 + \"px\";\n    document.getElementById(\"privacy-iframe-wrap\").style.height =\n      document.getElementById(\"privacyModalBody\").clientHeight - 40 + \"px\";\n  }\nfunction flex() {\n    /*スマホのURLバーに隠されないように、body部分の高さを調整*/\n    var height = window.innerHeight;\n    document.getElementsByClassName(\"fixed\")[0].style.height = height + \"px\";\n    document.body.style.height = height + \"px\";\n  }\n  var checkedTimeout;\n  function copy() {\n    /*URLコピー*/\n    clearTimeout(checkedTimeout);\n    var url = location.href;\n    navigator.clipboard.writeText(url);\n    document.getElementById(\"checked-icon\").style.display = \"inline\";\n    document.getElementById(\"url-icon\").style.display = \"none\"; //チェックアイコンを表示\n    checkedTimeout = setTimeout(() => {\n      /*10秒後、元に戻す*/\n      document.getElementById(\"checked-icon\").style.display = \"none\";\n      document.getElementById(\"url-icon\").style.display = \"inline\";\n    }, 10000);\n  }\n\n//# sourceURL=webpack://bingo/./src/resize.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.js");
/******/ 	
/******/ })()
;