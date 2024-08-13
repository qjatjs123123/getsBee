/* eslint-disable no-undef */

function IsRangeSame(originData, newData) {
  if (
    originData.startIndex !== newData.startIndex ||
    originData.startOffset !== newData.startOffset ||
    originData.lastIndex !== newData.lastIndex ||
    originData.lastOffset !== newData.lastOffset
  )
    return false;
  return true;
}

function getTrack(Node) {
  const track = [];
  while (Node.nodeName !== "HTML") {
    const siblingNodes = Array.from(Node.parentNode.childNodes);
    for (let i = 0; i < siblingNodes.length; i++) {
      if (siblingNodes[i] === Node) track.push(i);
    }

    Node = Node.parentNode;
  }

  return track;
}

function getReverseTrack(rootNode, track) {
  let currentNode = rootNode;
  for (let i = track.length - 1; i >= 0; i--) {
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

async function updateHighlight(color, colorh) {
  if (SELECTED_ID >= 0) {
    const rangeData = findRangeDataById();
    if (rangeData) rangeData.color = color;
    updateHighLightAPI(color, colorh);
  } else {
    const rangeData = findRecommendDataById();
    rangeData.color = color;

    const responseData = await postHighlightData(rangeData);

    rangeData.id = responseData.data.highlightId;
    const elements = document.querySelectorAll(`[data-id="${SELECTED_ID}"]`);

    elements.forEach((element) => {
      if (element) {
        element.style.backgroundColor = color;
        element.dataset.id = rangeData.id; // 기존 data-id 값을 유지
        element.style.cursor = "pointer";
      }
    });
    SELECTED_ID = rangeData.id;
    highLightHover(SELECTED_ID, color, colorh);
  }
}

function dragHighlight(range, color, colorh) {
  const rangeData = createRangeData({
    content: range.toString(),
    startIndex: JSON.stringify(getTrack(range.startContainer)),
    startOffset: range.startOffset,
    lastIndex: JSON.stringify(getTrack(range.endContainer)),
    lastOffset: range.endOffset,
    color: color,
  });

  // 하이라이트 저장 API 호출
  insertHighLightAPI(rangeData);
}

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

function highLightHover(id, color, colorh, range) {
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
        const clickedId = Number(clickedElement.dataset.id);

        SELECTED_ID = clickedId;

        // SELECTED_ID를 클릭한 요소의 data-id로 설정합니다

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
