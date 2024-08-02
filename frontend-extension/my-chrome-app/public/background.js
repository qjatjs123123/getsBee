/* eslint-disable no-undef */
// 메시지 수신 및 데이터 저장
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.pageContentArr) {
    // 저장: chrome.storage.local 또는 chrome.storage.sync에 데이터 저장
    // eslint-disable-next-line no-undef
    chrome.storage.local.set(
      {
        pageContentArr: message.pageContentArr,
        hostName: message.hostName,
      },
      () => {}
    );
  }
  if (message.type === "RECOMMEND_CLICKED") {
    chrome.storage.local.set({ resultArr: message.resultArr }, () => {});
    // 현재 활성화된 탭으로 메시지 전송
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (tabs.length > 0) {
        const activeTabId = tabs[0].id;
        chrome.tabs.sendMessage(activeTabId, {
          type: "RECOMMEND_CLICKED",
          resultArr: message.resultArr,
          contentArr: message.contentArr,
        });
      }
    });
  }
});

/* eslint-disable no-undef */
// background.js

// URL 변경 감지
// chrome.webNavigation.onCommitted.addListener(
//   (details) => {
//     if (details.frameId === 0) {
//       // 메인 프레임에서만 처리
//       chrome.storage.local.set({ resultArr: [] }, () => {
//         console.log("Result array has been cleared.");
//       });
//       chrome.tabs.sendMessage(details.tabId, {
//         type: "URL_CHANGED",
//         url: details.url,
//       });
//     }
//   },
//   { url: [{ urlMatches: ".*" }] }
// );

// 탭 활성화 감지
chrome.tabs.onActivated.addListener((activeInfo) => {
  chrome.storage.local.set({ resultArr: [] }, () => {});
  chrome.tabs.sendMessage(activeInfo.tabId, {
    type: "TAB_CHANGED",
    tabId: activeInfo.tabId,
  });
});

// // 메시지 수신 및 데이터 저장
// chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
//   if (message.pageContentArr) {
//     // 저장: chrome.storage.local 또는 chrome.storage.sync에 데이터 저장
//     chrome.storage.local.set(
//       { pageContentArr: message.pageContentArr, hostName: message.hostName },
//       () => {}
//     );
//   }

//   if (message.type === "RECOMMEND_CLICKED") {
//     // 현재 활성화된 탭으로 메시지 전송
//     chrome.runtime.sendMessage({
//       type: "RECOMMEND_CLICKED",
//     });
//   }
// });
