/* eslint-disable no-undef */
const recommendModel = {
  recommendArr :[],
  RECOMMEND_DATA_ARR: {},
  idx : -1,
  curHTML: "",

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

  highlightRecommend() {
    this.curHTML = document.body;
    for (let i = 0; i < this.recommendArr.length; i++) {
      const target = recommendModel.recommendArr[i];
      recommendModel.recursion(this.curHTML, target);
    }
  },

  recursion(node, target) {
    
    function traverse(currentNode) {
      if (currentNode.nodeType === Node.TEXT_NODE) {
        const parentElement = currentNode.parentNode;
        const tagName = parentElement.tagName.toLowerCase();

        const isTargetTag =
          tagName === "p" ||
          tagName === "span" ||
          tagName === "div" ||
          tagName === "li" ||
          tagName === "article" ||
          tagName === "img";
        if (!isTargetTag) return;

        const textContent = currentNode.textContent.trim();

        if (
          textContent &&
          textContent.length > 20 &&
          textContent.length <= 200
        ) {
          startIndex = currentNode.textContent.indexOf(target);
          if (startIndex !== -1) {
            const range = document.createRange();
            range.setStart(currentNode, startIndex);
            range.setEnd(currentNode, startIndex + target.length);

            const param = {
              color: GRAY_COLOR,
              range : range,
              url : pageModel.url,
              thumbnailUrl : pageModel.thumbnailUrl,
              title : pageModel.title,
            };

            const rangeData = highlightModel.stringifyRange(param)
            rangeData.id = recommendModel.idx--;


            Main.renderHighlight(rangeData);
            recommendModel.RECOMMEND_DATA_ARR[rangeData.id] = rangeData;  
          }
        }
      }

      if (currentNode.nodeType === Node.ELEMENT_NODE) {
        Array.from(currentNode.childNodes).forEach((child) => traverse(child));
      }
    }

    traverse(node);
  },

  findRecommendDataById(id) {
    return recommendModel.RECOMMEND_DATA_ARR[id] || null;
  }
}