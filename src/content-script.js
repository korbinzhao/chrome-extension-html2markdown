const html2md = require("html-to-md");
const { saveAs } = require("file-saver");
const { sleep } = require("./utils/index");

function downloadFile(filename, content) {
  var blob = new Blob([content], {
    type: "text/plain;charset=utf-8",
  });

  saveAs(blob, filename);
}

function getMarkdown(contentClassName) {
  const container = document.querySelector(contentClassName);

  if (!container) {
    console.log(`${contentClassName} 不存在`);
    return;
  }

  const html = container.innerHTML;

  const output = html2md(html);

  return output;
}

async function batchConvert({
  tabClassName,
  tabTitleClassName,
  contentClassName,
}) {
  console.log("batchConvert");

  const tabs = document.querySelectorAll(tabClassName);

  console.log("--- tabs ---", tabClassName, tabs);

  for await (const [index, tab] of Object.entries(tabs)) {
    tab.click();
    await sleep(2000);
    const title = tab.querySelector(tabTitleClassName)?.innerHTML;
    const titleWithOrder = `${1 * index + 1}.${title}.md`;
    const markdownText = getMarkdown(contentClassName);
    console.log("--- titleWithOrder ---", titleWithOrder);
    downloadFile(titleWithOrder, markdownText);
  }
}

function currentPageConvert(contentQueryKey) {

  console.log('currentPageConvert');

  const markdownText = getMarkdown(contentQueryKey);
  const title = document.querySelector("title")
    ? document.querySelector("title").innerHTML
    : "download_article";

  downloadFile(`${title}.md`, markdownText);
}

function onLoad() {
  chrome.runtime.onMessage.addListener(function (
    request,
    sender,
    sendResponse
  ) {
    console.log("doConvert", request);

    const {
      actionType,
      tabClassName,
      tabTitleClassName,
      contentClassName,
      contentQueryKey,
    } = request;

    if (actionType === "batch_convert_action") {
      batchConvert({ tabClassName, tabTitleClassName, contentClassName });
      sendResponse("received");
    } else if (actionType === "current_page_convert_action") {
      currentPageConvert(contentQueryKey);
      sendResponse("received");
    }

    return true;
  });
}

window.addEventListener("load", onLoad, false);
