document.addEventListener("DOMContentLoaded", () => {
  // 저장된 데이터 가져오기
  chrome.storage.local.get(["pageContent"], (result) => {
    const contentDiv = document.getElementById("content");
    if (result.pageContent) {
      contentDiv.textContent = result.pageContent;
      console.log(result.pageContent);
    } else {
      contentDiv.textContent = "No content available";
    }
  });
});
