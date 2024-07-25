chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
  if (tabs.length === 0) {
    return;
  }

  const tab = tabs[0];
  if (!tab.url) {
    return;
  }

  if (tab.url.startsWith("chrome://")) {
    return;
  }

  chrome.scripting.executeScript({
    target: { tabId: tabs[0].id },
    files: ["content.js", "highlight.js", "data.js"], // 콘텐츠 스크립트 파일 경로
  });
});
