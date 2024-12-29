const LocalStorageModel = {
  insert(data, isInsert, isUpdate) {
    data.is_deleted = isInsert;
    data.is_updated = false;
    if (isUpdate)
      data.is_updated = isUpdate;
    const localStorageKey = "storageKey";
      let storageData = JSON.parse(localStorage.getItem(localStorageKey)) || {};
  
      const urlKey = data.url;
      if (!storageData[urlKey]) {
          storageData[urlKey] = []; 
      }
      
      storageData[urlKey].push(data);
  
      localStorage.setItem(localStorageKey, JSON.stringify(storageData));

  },
  
  select(url) {
    const localStorageKey = "storageKey";
    const storageData = JSON.parse(localStorage.getItem(localStorageKey)) || {};
  
    return storageData[url] || [];
  }
}