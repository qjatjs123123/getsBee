/* eslint-disable no-undef */
const recommendModel = {
  init() {
    chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
      if (message.type === "RECOMMEND_CLICKED") {
        // this.recommendArr = message.resultArr;
        // recommendModel.highlightRecommend();
      }

      if (message.type === "ENABLE_DATA") {
        window.location.reload()
      }

    });
  },

}