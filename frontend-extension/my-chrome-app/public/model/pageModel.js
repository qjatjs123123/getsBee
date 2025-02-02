/* eslint-disable no-undef */
const pageModel = (() => {
  let domain = "";
  let url = "";
  let thumbnailUrl = "";
  let title = "";

  function init() {
    const ogImageMetaTag = document.querySelector('meta[property="og:image"]');
    const titleMetaTag = document.querySelector("title");

    domain = window.location.hostname;
    url = window.location.href;
    thumbnailUrl = ogImageMetaTag ? ogImageMetaTag.getAttribute("content") : null;
    title = titleMetaTag ? titleMetaTag.textContent : null;
  }

  function saveChromePage(recommendArr, highlightArr) {
    const saveData = {
      domain,
      HTMLContent: document.documentElement.outerHTML,
      recommendArr,
      highlightArr,
      summaryContent: "",
    };
    chrome.storage.local.set(saveData, () => {});
  }

  return {
    init,
    saveChromePage,
    getDomain: () => domain,
    getUrl: () => url,
    getThumbnailUrl: () => thumbnailUrl,
    getTitle: () => title,
  };
})();

//module.exports = { pageModel };