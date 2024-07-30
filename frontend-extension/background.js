// 메시지 수신 및 데이터 저장
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.pageContent) {
    // 저장: chrome.storage.local 또는 chrome.storage.sync에 데이터 저장
    chrome.storage.local.set({ pageContent: message.pageContent }, () => {
      console.log("Page content saved", message.pageContent);
    });
  }
});
