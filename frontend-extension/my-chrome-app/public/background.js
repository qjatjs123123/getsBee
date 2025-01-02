/* eslint-disable no-undef */
chrome.runtime.onInstalled.addListener(() => {
  chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  
    if (message.type === "SEND_BROWSER_INFO") {
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
  
    if (message.type === "RECOMMEND_CLICKED") {

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

  
})
