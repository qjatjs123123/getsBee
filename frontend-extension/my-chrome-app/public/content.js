let textNodesArr = [];
let textContents = [];
/* eslint-disable no-undef */

window.addEventListener("load", () => {
  chrome.storage.local.set({ resultArr: [] }, () => {});
  extractTextNodes(getStart());

  function getStart() {
    if (getDomain() === "n.news.naver.com") {
      const articles = document.getElementsByTagName("article");
      return articles.length > 0 ? articles[0] : document.body;
    }
    return document.body;
  }

  function highlightRecommend(resultArr) {
    for (let i = 0; i < resultArr.length; i++) {
      const range = textNodesArr[resultArr[i]];
      dragHighlight(range, YELLOW_COLOR, YELLOW_COLOR_H);
    }
  }

  function extractTextNodes(node) {
    function traverse(currentNode) {
      if (currentNode.nodeType === Node.TEXT_NODE) {
        const parentElement = currentNode.parentNode;
        const tagName = parentElement.tagName.toLowerCase();

        const isTargetTag =
          tagName === "p" ||
          tagName === "span" ||
          tagName === "div" ||
          tagName === "li" ||
          tagName === "article";
        if (!isTargetTag) return;

        const textContent = currentNode.textContent.trim();

        if (textContent && textContent.length > 20) {
          const sentences = textContent
            .split(".")
            .map((sentence) => sentence.trim())
            .filter((sentence) => sentence.length > 0);

          let startIndex = 0;
          sentences.forEach((sentence) => {
            textContents.push(sentence);
            const range = document.createRange();
            startIndex = currentNode.textContent.indexOf(sentence, startIndex);
            range.setStart(currentNode, startIndex);
            range.setEnd(currentNode, startIndex + sentence.length);
            startIndex += sentence.length;
            textNodesArr.push(range);
          });
        }
      }

      if (currentNode.nodeType === Node.ELEMENT_NODE) {
        Array.from(currentNode.childNodes).forEach((child) => traverse(child));
      }
    }

    traverse(node);
  }

  function sendPageContent() {
    chrome.runtime.sendMessage({
      pageContentArr: textContents,
      hostName: getDomain(),
    });
  }

  sendPageContent();
  chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.type === "TAB_CHANGED") {
      sendPageContent();
    } else if (message.type === "RECOMMEND_CLICKED") {
      highlightRecommend(message.resultArr);
    }
  });

  loadFontAwesome();

  const tooltip = createTooltip();
  document.body.appendChild(tooltip);

  COLORS.forEach(({ color, colorh }) => {
    const colorButton = createColorButton(color, colorh);
    tooltip.appendChild(colorButton);
  });

  const binButton = createIconButton("fa fa-trash-o", "25px", () => {
    deleteHighlight();
    hideTooltip();
  });
  tooltip.appendChild(binButton);

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
});

function displayTooltip(left, top) {
  tooltip.style.left = `${left}px`;
  tooltip.style.top = `${top}px`;
  tooltip.style.visibility = "visible";
  tooltip.style.opacity = "1";
}
