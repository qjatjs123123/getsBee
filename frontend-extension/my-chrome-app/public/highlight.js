/* eslint-disable no-undef */
function getTrack(node) {
  const track = [];
  while (node.tagName !== "HTML") {
    const siblingNodes = Array.from(node.parentNode.childNodes);
    const index = siblingNodes.indexOf(node);
    track.push(index);
    node = node.parentNode;
  }
  // 마지막으로 HTML 태그의 인덱스 (0)를 추가합니다.
  track.push(0);
  return track.reverse(); // 트랙을 뒤집어 루트부터 노드까지의 경로를 반환합니다.
}

function getReverseTrack(rootNode, track) {
  let currentNode = rootNode;
  for (let i = 1; i < track.length; i++) {
    // track[0]은 항상 0이므로 생략합니다.
    currentNode = currentNode.childNodes[track[i]];
  }
  return currentNode;
}

function ArrayToString(arr) {
  return arr.join();
}

function deleteHighlight() {
  const elements = document.querySelectorAll(`[data-id="${SELECTED_ID}"]`);

  elements.forEach((element) => {
    if (element) {
      const parent = element.parentNode;
      while (element.firstChild) {
        parent.insertBefore(element.firstChild, element);
      }
      element.remove();
    }
  });
}

function updateColorById(color, colorh) {
  // 선택된 ID를 가진 모든 요소를 선택합니다
  const elements = document.querySelectorAll(`[data-id="${SELECTED_ID}"]`);
  elements.forEach((element) => {
    if (element) {
      element.style.backgroundColor = color;
      element.dataset.id = element.dataset.id; // 기존 data-id 값을 유지
      element.style.cursor = "pointer";
    }
  });
  highLightHover(SELECTED_ID, color, colorh);
}

function updateHighlight(color, colorh) {
  const rangeData = findRangeDataById();
  rangeData.color = color;
  updateHighLightAPI(rangeData, color, colorh);
}

///추가
// 전체 문서의 높이를 계산하는 함수

// 특정 범위의 노드에서 픽셀 위치를 가져오는 함수
function getBoundingRect(node, offset) {
  const range = document.createRange();
  range.setStart(node, offset);
  range.setEnd(node, offset);
  const rect = range.getBoundingClientRect();
  return {
    top: rect.top + window.scrollY,
    bottom: rect.bottom + window.scrollY,
  };
}

function calculateRelativePosition(range) {
  if (!range || !(range instanceof Range)) {
    throw new Error("Invalid Range object.");
  }

  const documentHeight = getDocumentHeight();
  const documentTop = window.pageYOffset || document.documentElement.scrollTop;

  const startRect = getBoundingRect(range.startContainer, range.startOffset);
  const endRect = getBoundingRect(range.endContainer, range.endOffset);

  const startTop = Math.max(startRect.top, documentTop);
  const endBottom = Math.min(endRect.bottom, documentTop + documentHeight);

  const startRelativeHeight = startTop / documentHeight;
  const endRelativeHeight = endBottom / documentHeight;

  return {
    startRelativeHeight: Math.max(0, Math.min(1, startRelativeHeight)),
    endRelativeHeight: Math.max(0, Math.min(1, endRelativeHeight)),
  };
}

function getPixelPosition(relativeHeight) {
  const documentHeight = getDocumentHeight();
  return relativeHeight * documentHeight;
}
function compareRanges(range, content) {
  return range.toString().indexOf(content) !== -1;
}
function findNodeAtPosition(pixelPosition, param, isEnd) {
  let nodes = [document.body];
  let foundNode = null;
  const array = [];
  function traverseNode(node) {
    if (node.nodeType === Node.TEXT_NODE) {
      const range = document.createRange();
      range.selectNodeContents(node);
      const rects = range.getClientRects();

      for (let rect of rects) {
        const adjustedTop = rect.top + window.scrollY;
        const adjustedBottom = rect.bottom + window.scrollY;

        if (adjustedTop <= pixelPosition && adjustedBottom >= pixelPosition) {
          // 범위에 맞는 하이라이트 범위를 찾기 위해 범위를 조정합니다.
          const highlightRange = document.createRange();
          if (!isEnd) {
            highlightRange.setStart(node, param.startOffset);
            highlightRange.setEnd(node, node.textContent.length);
          } else {
            highlightRange.setStart(node, 0);
            highlightRange.setEnd(node, param.lastOffset);
          }

          const str = highlightRange.toString().trim();
          console.log(
            param.content.trim(),
            str,
            param.content.trim().includes(str)
          );
          if (param.content.trim().includes(str)) {
            array.push(node);
          }
        }
      }
    } else {
      for (let child of node.childNodes) {
        if (traverseNode(child)) return true;
      }
    }
    return false;
  }

  traverseNode(document.body);

  return array;
}

function getDocumentHeight() {
  return Math.max(
    document.body.scrollHeight,
    document.documentElement.scrollHeight,
    document.body.offsetHeight,
    document.documentElement.offsetHeight,
    document.body.clientHeight,
    document.documentElement.clientHeight
  );
}

///
function dragHighlight(range, color, colorh) {
  const { startRelativeHeight, endRelativeHeight } =
    calculateRelativePosition(range);

  const rangeData = createRangeData({
    content: range.toString(),
    startIndex: startRelativeHeight,
    startOffset: range.startOffset,
    lastIndex: endRelativeHeight,
    lastOffset: range.endOffset,
    color: color,
  });

  // 하이라이트 저장 API 호출
  insertHighLightAPI(rangeData);
}

// function dragHighlight(range, color, colorh) {
//   const rangeData = createRangeData({
//     content: range.toString(),
//     startIndex: JSON.stringify(getTrack(range.startContainer)),
//     startOffset: range.startOffset,
//     lastIndex: JSON.stringify(getTrack(range.endContainer)),
//     lastOffset: range.endOffset,
//     color: color,
//   });
//   // 하이라이트 저장 API 호출
//   insertHighLightAPI(rangeData);
// }

function findTextNodesInRange(range) {
  let textNodes = [];

  function isTextNode(node) {
    return node.nodeType === Node.TEXT_NODE;
  }

  function isNonEmptyTextNode(node) {
    return !/^\s*$/.test(node.nodeValue);
  }

  function recurse(node) {
    if (
      isTextNode(node) &&
      range.intersectsNode(node) &&
      isNonEmptyTextNode(node)
    ) {
      textNodes.push(node);
    } else {
      node.childNodes.forEach(recurse);
    }
  }
  recurse(range.commonAncestorContainer);
  return textNodes.filter((node) => range.intersectsNode(node));
}

function highlightTextNodes(textNodes, range, color, colorh, data) {
  textNodes.forEach((node) => {
    const nodeRange = createNodeRange(node, range);
    const highlightBeeTag = createHighlightBeeTag(data.id, color);
    nodeRange.surroundContents(highlightBeeTag);
  });
  highLightHover(data.id, color, colorh, range);
}

function createNodeRange(node, range) {
  const nodeRange = document.createRange();
  if (node === range.startContainer && node === range.endContainer) {
    nodeRange.setStart(node, range.startOffset);
    nodeRange.setEnd(node, range.endOffset);
  } else if (node === range.startContainer) {
    nodeRange.setStart(node, range.startOffset);
    nodeRange.setEnd(node, node.nodeValue.length);
  } else if (node === range.endContainer) {
    nodeRange.setStart(node, 0);
    nodeRange.setEnd(node, range.endOffset);
  } else {
    nodeRange.selectNodeContents(node);
  }
  return nodeRange;
}

function createHighlightBeeTag(id, color) {
  const highlightBeeTag = document.createElement("bee");
  highlightBeeTag.style.backgroundColor = color;
  highlightBeeTag.style.cursor = "pointer";
  highlightBeeTag.dataset.id = id; // 데이터 속성에 ID 설정
  return highlightBeeTag;
}

function highLightHover(id, color, colorh) {
  const elements = document.querySelectorAll(`[data-id="${id}"]`);

  elements.forEach((element) => {
    element.addEventListener("mouseover", () => {
      elements.forEach((el) => {
        el.style.backgroundColor = colorh; // 호버 시 배경색
      });
    });

    element.addEventListener("mouseout", () => {
      elements.forEach((el) => {
        el.style.backgroundColor = color; // 호버 시 배경색
      });
    });

    element.addEventListener("click", (event) => {
      elements.forEach((el) => {
        event.stopPropagation();
        const clickedElement = event.currentTarget;
        const clickedId = clickedElement.dataset.id;

        // SELECTED_ID를 클릭한 요소의 data-id로 설정합니다
        SELECTED_ID = Number(clickedId);
        const left = event.clientX + window.scrollX + 10;
        const top = event.clientY + window.scrollY + 10;
        displayTooltip(left, top);
        // deleteHighlight();
      });
    });
  });
}

// 사용자가 마우스를 놓을 때 하이라이트를 추가합니다
// document.addEventListener("mouseup", addHighlightToSelection);
