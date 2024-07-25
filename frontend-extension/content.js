window.addEventListener("load", () => {
  const tooltip = document.createElement("div");
  tooltip.id = "tooltip";
  tooltip.style.visibility = "hidden"; // 요소는 보이지 않지만 여전히 DOM에 존재
  tooltip.style.opacity = "0";
  tooltip.style.position = "absolute";
  tooltip.style.padding = `${TOOLTIP_PT} ${TOOLTIP_PL}`;
  tooltip.style.backgroundColor = TOOLTIP_BGC; // 배경색을 흰색으로 설정
  tooltip.style.borderRadius = TOOLTIP_BORDER_RADIUS;
  tooltip.style.fontSize = TOOLTIP_FONTSIZE;
  tooltip.style.zIndex = "1000";
  tooltip.style.boxShadow = "0 4px 8px rgba(0, 0, 0, 0.3)"; // 그림자 효과 추가
  document.body.appendChild(tooltip);

  // 색상 버튼을 만들고 툴팁에 추가

  COLORS.forEach(({ color, colorh }) => {
    const button = document.createElement("button");
    button.classList.add("color-btn");
    button.style.width = BTN_WIDTH;
    button.style.height = BTN_HEIGHT;
    button.style.borderRadius = BTN_BORDER_RADIUS;
    button.style.marginLeft = BTN_ML;
    button.style.marginRight = BTN_MR;
    button.style.backgroundColor = color;
    button.style.border = "none";
    button.style.cursor = "pointer";

    button.addEventListener("mousedown", (event) => {
      hideTooltip();
      dragHighlight(selection.getRangeAt(0), color, colorh);
      deleteRange();
      event.stopPropagation(); // 이벤트 전파를 막음
    });
    tooltip.appendChild(button);
  });

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
