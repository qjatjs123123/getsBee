/* eslint-disable no-undef */
// 메시지 수신 및 데이터 저장
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.pageContentArr) {
    // 저장: chrome.storage.local 또는 chrome.storage.sync에 데이터 저장
    // eslint-disable-next-line no-undef
    chrome.storage.local.set(
      { pageContentArr: message.pageContentArr, hostName: message.hostName },
      () => {}
    );
  }
});

// background.js (백그라운드 스크립트)
chrome.tabs.onActivated.addListener((activeInfo) => {
  chrome.storage.local.set({ resultArr: [] }, () => {});
  chrome.tabs.sendMessage(activeInfo.tabId, {
    type: "TAB_CHANGED",
    tabId: activeInfo.tabId,
  });
});
