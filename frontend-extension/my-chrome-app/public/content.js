/* eslint-disable no-undef */
window.addEventListener("load", async () => {
  chrome.storage.local.set({ resultArr: [] }, () => {});

  function highlightRecommend(resultArr, contentArr) {
    console.log(contentArr, resultArr);
  }

  function extractTextNodes(node) {
    let textNodes = [];

    // 재귀적으로 모든 자식 노드를 탐색합니다
    function traverse(currentNode, insideTargetTag) {
      // 텍스트 노드인 경우
      if (currentNode.nodeType === Node.TEXT_NODE) {
        const textContent = currentNode.textContent.trim();
        if (textContent && insideTargetTag) {
          if (textContent.length > 20 && textContent.length < 200) {
            textNodes.push(textContent);
          }
        }
      }

      // 자식 노드를 재귀적으로 탐색합니다
      if (currentNode.nodeType === Node.ELEMENT_NODE) {
        const tagName = currentNode.tagName.toLowerCase();
        const isTargetTag =
          tagName === "p" || tagName === "span" || tagName === "div";

        // 현재 태그가 목표 태그인지 확인
        Array.from(currentNode.childNodes).forEach((child) =>
          traverse(child, insideTargetTag || isTargetTag)
        );
      }
    }

    traverse(node, false);
    return textNodes;
  }

  // 예: 페이지의 텍스트 내용을 가져와 Background Script에 전송

  function sendPageContent() {
    console.log(extractTextNodes(document.body));
    chrome.runtime.sendMessage({
      pageContentArr: extractTextNodes(document.body),
      hostName: getDomain(),
    });
  }

  // 페이지 로드 시 데이터 전송
  sendPageContent();

  chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.type === "TAB_CHANGED") {
      // 탭이 변경되면 페이지 내용을 다시 전송
      sendPageContent();
    } else if (message.type === "RECOMMEND_CLICKED") {
      highlightRecommend(message.resultArr, message.contentArr);
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
    // selection 예외처리
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
  tooltip.style.left = `${left}px`; // 범위 옆에 나타나도록 오프셋 설정
  tooltip.style.top = `${top}px`;
  tooltip.style.visibility = "visible";
  tooltip.style.opacity = "1";
}
