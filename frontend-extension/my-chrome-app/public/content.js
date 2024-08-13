let resultArr = [];
let originalHTML = "";
let accessToken = "";
let refreshToken = "";
let userState = null;
let tooltip = "";
let recommendSelection = "";
let idx = -1;
let isEnabled = true;
function getStoreHTML2() {
  const s3Url =
    "https://getsbee.s3.ap-northeast-2.amazonaws.com/develop/highlight/body.txt";

  fetch(s3Url)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.text();
    })
    .then((data) => {
      document.body.innerHTML = data;
      console.log(data);
    })
    .catch((error) => {
      console.error("Error fetching text file:", error);
    });
}

/* eslint-disable no-undef */
window.addEventListener("load", () => {
  getStoreHTML();
  sendPageContent();
  originalHTML = document.body.innerHTML;
  // selectHighLightAPI();
  // getStoreHTML2();
  function getStoreHTML() {
    const URL = getURL();
    chrome.storage.local.get([URL], function (result) {
      const data = result[URL];

      if (data) {
        document.body.innerHTML = data;
        // HTML이 적용된 후 스타일 및 스크립트 재적용
        requestAnimationFrame(() => {
          applyBeeStyles();
          init();
        });
      } else {
        init();
      }
    });
  }

  function applyBeeStyles() {
    const beeTags = document.querySelectorAll("bee");
    const beeData = Array.from(beeTags).map((tag) => {
      return {
        dataId: tag.getAttribute("data-id"),
        backgroundColor: window.getComputedStyle(tag).backgroundColor,
      };
    });

    beeData.forEach(({ dataId, backgroundColor }) => {
      highLightHover(dataId, backgroundColor, getHoverColor(backgroundColor));
    });
  }
  setTimeout(() => {
    if (getDomain() === "n.news.naver.com") {
      document.body.innerHTML = originalHTML;
      init();
    }
  }, 500);

  function highlightRecommend(resultArr) {
    for (let i = 0; i < resultArr.length; i++) {
      const target = resultArr[i];
      recursion(document.body, target);
    }
  }

  function recursion(node, target) {
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

            const rangeData = createRangeData({
              content: range.toString(),
              startIndex: JSON.stringify(getTrack(range.startContainer)),
              startOffset: range.startOffset,
              lastIndex: JSON.stringify(getTrack(range.endContainer)),
              lastOffset: range.endOffset,
              color: GRAY_COLOR,
            });
            rangeData.id = idx--;
            processHighlight(rangeData, GRAY_COLOR_H);
            RECOMMEND_DATA_ARR.push(rangeData);
            // dragHighlight(range, YELLOW_COLOR);
          }
        }
      }

      if (currentNode.nodeType === Node.ELEMENT_NODE) {
        Array.from(currentNode.childNodes).forEach((child) => traverse(child));
      }
    }

    traverse(node);
  }

  function init() {
    tooltip = createTooltip();
    document.body.appendChild(tooltip);
    loadFontAwesome();
    const binButton = createIconButton("fa fa-trash-o", "25px", () => {
      deleteHighLightAPI();
      hideTooltip();
    });
    COLORS.forEach(({ color, colorh }) => {
      const colorButton = createColorButton(color, colorh);
      tooltip.appendChild(colorButton);
    });
    tooltip.appendChild(binButton);

    chrome.storage.sync.get([getDomain()], (result) => {
      isEnabled = result[getDomain()] || false;
    });
  }

  chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.type === "TAB_CHANGED") {
      sendPageContent();
    } else if (message.type === "RECOMMEND_CLICKED") {
      highlightRecommend(message.resultArr);
      resultArr = message.resultArr;
    }
    if (message.type === "ENABLE_DATA") {
      isEnabled = message.isEnabled;
      console.log(isEnabled);
    }
  });

  function createTooltip() {
    const tooltip = document.createElement("div");
    tooltip.id = "tooltip";
    tooltip.style.visibility = "hidden";
    tooltip.style.opacity = "0";
    tooltip.style.position = "absolute";
    tooltip.style.padding = `${TOOLTIP_PT} ${TOOLTIP_PL}`;
    tooltip.style.backgroundColor = TOOLTIP_BGC;
    tooltip.style.borderRadius = TOOLTIP_BORDER_RADIUS;
    tooltip.style.fontSize = TOOLTIP_FONTSIZE;
    tooltip.style.zIndex = "1000";
    tooltip.style.boxShadow = "0 4px 8px rgba(0, 0, 0, 0.3)";
    tooltip.style.display = "flex";
    tooltip.style.flexDirection = "row";
    tooltip.style.alignItems = "center";
    tooltip.style.justifyContent = "center";
    tooltip.style.gap = "8px";
    return tooltip;
  }

  function createColorButton(color, colorh) {
    const button = document.createElement("button");
    button.style.width = BTN_WIDTH;
    button.style.height = BTN_HEIGHT;
    button.style.borderRadius = BTN_BORDER_RADIUS;
    button.style.backgroundColor = color;
    button.style.border = "none";
    button.style.cursor = "pointer";

    button.addEventListener("mousedown", (event) => {
      hideTooltip();
      decideDragOrUpdate(color, colorh);
      deleteRange();
      event.stopPropagation();
    });

    return button;
  }

  function createIconButton(iconClass, fontSize, onClick) {
    const button = document.createElement("button");
    button.style.width = BTN_WIDTH;
    button.style.height = BTN_HEIGHT;
    button.style.borderRadius = BTN_BORDER_RADIUS;
    button.style.backgroundColor = "transparent";
    button.style.border = "none";
    button.style.cursor = "pointer";
    button.style.display = "flex";
    button.style.alignItems = "center";
    button.style.justifyContent = "center";

    const icon = document.createElement("i");
    icon.className = iconClass;
    icon.style.fontSize = fontSize;

    button.appendChild(icon);
    button.addEventListener("mousedown", (event) => {
      onClick();
      event.stopPropagation();
    });

    return button;
  }

  function loadFontAwesome() {
    const link = document.createElement("link");
    link.href =
      "https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css";
    link.rel = "stylesheet";
    link.type = "text/css";
    document.head.appendChild(link);
  }

  function decideDragOrUpdate(color, colorh) {
    if (isTextSelected(selection.getRangeAt(0)))
      dragHighlight(selection.getRangeAt(0), color, colorh);
    else updateHighlight(color, colorh);
  }

  function deleteRange() {
    if (!selection) return;
    if (selection.rangeCount > 0) selection.removeAllRanges();
  }

  function hideTooltip() {
    tooltip.style.visibility = "hidden";
    tooltip.style.opacity = "0";
  }

  function getDragRectPos(range) {
    const rects = range.getClientRects();
    if (rects.length <= 0) return [null, null];
    const lastRect = rects[rects.length - 1];
    const left = lastRect.right + window.scrollX + 10;
    const top = lastRect.bottom + window.scrollY;
    return [left, top];
  }

  document.addEventListener("mouseup", (event) => {
    hideTooltip();
    selection = window.getSelection();
    if (!isValidSelection(selection)) return;

    const range = selection.getRangeAt(0);
    if (!isTextSelected(range)) return;

    const [left, top] = getDragRectPos(range);
    if (!isValidPos(left, top)) return;

    displayTooltip(left, top);
  });

  document.addEventListener("mousedown", (event) => {
    deleteRange();
    hideTooltip();
  });
  window.addEventListener("message", (event) => {
    if (event.data.type === "TOKEN_UPDATE") {
      chrome.storage.sync.set({ GETSBEE_LOGIN: event.data }, function () {
        sendPageContent();
      });
    }
    if (event.data.type === "TOKEN_DELETE") {
      chrome.storage.sync.remove("GETSBEE_LOGIN", function () {
        sendPageContent();
        accessToken = "";
        refreshToken = "";
      });
    }
  });
});

function displayTooltip(left, top) {
  if (isEnabled) return;
  tooltip.style.left = `${left}px`;
  tooltip.style.top = `${top}px`;
  tooltip.style.visibility = "visible";
  tooltip.style.opacity = "1";
}
function sendPageContent() {
  chrome.storage.sync.get(["GETSBEE_LOGIN"], function (result) {
    accessToken = result.GETSBEE_LOGIN.accessToken;
    refreshToken = result.GETSBEE_LOGIN.refreshToken;
    userState = result.GETSBEE_LOGIN.userState;

    chrome.runtime.sendMessage({
      type: "SEND_BROWSER_INFO",
      hostName: getDomain(),
      resultArr: resultArr,
      HTMLContent: document.documentElement.outerHTML,
      accessToken: result.GETSBEE_LOGIN.accessToken,
      refreshToken: result.GETSBEE_LOGIN.refreshToken,
      userState: result.GETSBEE_LOGIN.userState,
    });
  });
}
