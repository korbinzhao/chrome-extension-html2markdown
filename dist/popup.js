/******/ (() => { // webpackBootstrap
var __webpack_exports__ = {};
/*!**********************!*\
  !*** ./src/popup.js ***!
  \**********************/
const batchConvertBtn = document.querySelector("#batch-convert");

function sendMessage(options){
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    chrome.tabs.sendMessage(
      tabs[0].id,
      options,
      function (response) {
        console.log("sendMessage", response);
      }
    );
  });
}

function onBatchCovert() {
  const tabClassName =
    document.querySelector("#tabClassName")?.value || ".section";
  const tabTitleClassName =
    document.querySelector("#tabTitleClassName")?.value || ".title-text";
  const contentClassName =
    document.querySelector("#markdownContentClassName")?.value ||
    ".markdown-body";

    sendMessage({actionType: "batch_convert_action", tabClassName, tabTitleClassName, contentClassName});
}

function onCurrentPageConvert(){
  const contentQueryKey =
    document.querySelector("#currentPageMarkdownCountentQueryKey")?.value ||
    "article";

    sendMessage({actionType: "current_page_convert_action", contentQueryKey});
}

batchConvertBtn.addEventListener("click", onBatchCovert);

const currentPageConvertBtn = document.querySelector('#current-page-covert');
currentPageConvertBtn.addEventListener("click", onCurrentPageConvert);
/******/ })()
;
//# sourceMappingURL=popup.js.map