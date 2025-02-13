let resultArr = [];
let originalHTML = "";
let accessToken = "";
let refreshToken = "";
let userState = null;
let tooltip = "";
let recommendSelection = "";
let idx = -1;
let isEnabled = true;

/* eslint-disable no-undef */
window.addEventListener("load", async () => {
  highlightRecovery();
  sendPageContent();
  originalHTML = document.body.innerHTML;

  async function getStoreHTML(url) {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.text();
      document.body.innerHTML = data;
    } catch (error) {
      console.error("Error fetching text file:", error);
    }
  }

  async function getAwsURLAPI() {
    try {
      const response = await fetch(
        "https://getsbee.kr/api/v1/highlights/body",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
          body: JSON.stringify({ url: getURL() }),
        }
      );

      if (response.status === 401) {
        throw new Error("Unauthorized: Please log in again.");
      }

      if (!response.ok) {
        throw new Error(`Network response was not ok: ${response.statusText}`);
      }

      const responseData = await response.json();
      return responseData.data.url;
    } catch (error) {
      console.error("Error in getAwsURLAPI:", error);
      throw error;
    }
  }

  async function getAwsURL() {
    try {
      if (getDomain() === "getsbee.kr" || getDomain() === "accounts.google.com")
        return;

      const awsURL = await getAwsURLAPI();
      if (awsURL) {
        await getStoreHTML(awsURL);
        requestAnimationFrame(() => {
          applyBeeStyles();
          init();
        });
      } else {
        init();
      }
    } catch (error) {
      init();
      console.log(error);
    }
  }
  function highlightRecovery() {
    chrome.storage.sync.get(["GETSBEE_LOGIN"], function (result) {
      selectHighLightAPI();
      requestAnimationFrame(() => {
        applyBeeStyles();
        init();
      });
    })
    
  }

  function sendPageContent() {
    chrome.storage.sync.get(["GETSBEE_LOGIN"], function (result) {
      accessToken = result.GETSBEE_LOGIN.accessToken;
      refreshToken = result.GETSBEE_LOGIN.refreshToken;
      userState = result.GETSBEE_LOGIN.userState;
      // getAwsURL();
      
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
  // setTimeout(() => {
  //   if (getDomain() === "n.news.naver.com") {
  //     document.body.innerHTML = originalHTML;
  //     init();
  //   }
  // }, 500);

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
      hideTooltip();
      deleteHighLightAPI();
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
    
    const icon = document.createElement("span");
    icon.style.display = "flex";
    icon.style.alignItems = "center";
    icon.style.justifyContent = "center";
    icon.innerHTML = `
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        class="${iconClass}"
        style="width: ${fontSize}; height: ${fontSize};"
      >
        <polyline points="3 6 5 6 21 6"></polyline>
        <path d="M19 6l-2 14H7L5 6"></path>
        <path d="M10 11v6"></path>
        <path d="M14 11v6"></path>
        <rect x="9" y="2" width="6" height="4" rx="1" ry="1"></rect>
      </svg>
    `;

    // const icon = document.createElement("i");
    // icon.className = iconClass;
    // icon.style.fontSize = fontSize;

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
