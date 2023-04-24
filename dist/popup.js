/******/ (() => { // webpackBootstrap
var __webpack_exports__ = {};
/*!**********************!*\
  !*** ./src/popup.js ***!
  \**********************/
const convertBtn = document.querySelector("#convert");

function onClick() {
  const tabClassName =
    document.querySelector("#tabClassName")?.value || ".section";
  const tabTitleClassName =
    document.querySelector("#tabTitleClassName")?.value || ".title-text";
  const contentClassName =
    document.querySelector("#markdownContentClassName")?.value ||
    ".markdown-body";

  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    chrome.tabs.sendMessage(
      tabs[0].id,
      {
        actionType: "convert_action",
        tabClassName,
        tabTitleClassName,
        contentClassName,
      },
      function (response) {
        console.log("sendMessage", response);
      }
    );
  });
}

convertBtn.addEventListener("click", onClick);

/******/ })()
;
//# sourceMappingURL=popup.js.map