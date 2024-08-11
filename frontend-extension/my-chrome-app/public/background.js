/* eslint-disable no-undef */
// 메시지 수신 및 데이터 저장

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === "SEND_BROWSER_INFO") {
    // 저장: chrome.storage.local 또는 chrome.storage.sync에 데이터 저장
    // eslint-disable-next-line no-undef
    accessToken = message.accessToken;
    refreshToken = message.refreshToken;

    chrome.runtime.sendMessage({
      type: "SEND_DATA",
      data: {
        hostName: message.hostName,
        resultArr: message.resultArr,
        HTMLContent: message.HTMLContent,
        accessToken: message.accessToken,
        refreshToken: message.refreshToken,
        userState: message.userState,
      },
    });
  }

  if (message.type === "GET_DATA") {
    chrome.tabs.query(
      {
        active: true,
        currentWindow: true,
      },
      (tabs) => {
        if (tabs.length > 0) {
          const activeTabId = tabs[0].id;
          chrome.tabs.sendMessage(activeTabId, {
            type: "TAB_CHANGED",
          });
        }
      }
    );
  }

  if (message.type === "RECOMMEND_CLICKED") {
    // 현재 활성화된 탭으로 메시지 전송
    chrome.tabs.query(
      {
        active: true,
        currentWindow: true,
      },
      (tabs) => {
        if (tabs.length > 0) {
          const activeTabId = tabs[0].id;
          chrome.tabs.sendMessage(activeTabId, {
            type: "RECOMMEND_CLICKED",
            resultArr: message.resultArr,
          });
        }
      }
    );
  }
});

// 탭 활성화 감지
chrome.tabs.onActivated.addListener((activeInfo) => {
  chrome.tabs.sendMessage(activeInfo.tabId, {
    type: "TAB_CHANGED",
    tabId: activeInfo.tabId,
  });
});
