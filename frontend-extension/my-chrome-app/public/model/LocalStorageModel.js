/* eslint-disable no-undef */
const LocalStorageModel = {
  insert(data, storageKey) {

    let storageData = this.getStorageData(storageKey);

    if (this.isNotStorageInData(data.url, storageData)) {
      storageData[data.url] = [];
    }

    storageData[data.url].push(data);
    this.setStorageData(storageKey, storageData);
  },
  
  getStorageData(storageKey) {
    return JSON.parse(localStorage.getItem(storageKey)) || {};
  },

  setStorageData(storageKey, data) {
    localStorage.setItem(storageKey, JSON.stringify(data));
  },

  isNotStorageInData(urlKey, storageData) {
    return !(urlKey in storageData);
  },

  select(storageKey, url) {
    const storageData = JSON.parse(localStorage.getItem(storageKey)) || {};
    return storageData[url] || [];
  }
}