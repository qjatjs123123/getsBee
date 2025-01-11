/* eslint-disable no-undef */
const pageModel = {
  domain: "",
  url: "",
  thumbnailUrl: "",
  title: "",
  
  init() {
    const ogImageMetaTag = document.querySelector('meta[property="og:image"]');
    const titleMetaTag = document.querySelector("title");

    this.domain = window.location.hostname;
    this.url = window.location.href;
    this.thumbnailUrl = ogImageMetaTag ? ogImageMetaTag.getAttribute("content") : null;
    this.title = titleMetaTag ? titleMetaTag.textContent : null;
    
  },

  saveChromePage(domain, recommendArr, highlightArr) {
    const saveData  = {
      domain,
      HTMLContent: document.documentElement.outerHTML,
      recommendArr,
      highlightArr,
      summaryContent: ""
    }
    chrome.storage.local.set(saveData, () => {});
  },
}

module.exports = { pageModel };