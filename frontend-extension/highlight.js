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
      // 색상을 변경합니다
      element.style.color = color;

      // 자식 노드들 중에서 텍스트 노드와 다른 노드를 유지하기 위해 복사합니다
      const newElement = document.createElement(element.tagName);
      newElement.style.backgroundColor = color;
      newElement.dataset.id = element.dataset.id; // 기존 data-id 값을 유지
      newElement.style.cursor = "pointer";
      Array.from(element.childNodes).forEach((node) => {
        if (node.nodeType === Node.TEXT_NODE) {
          // 텍스트 노드의 내용을 가져온 후 줄 바꿈을 유지
          newElement.appendChild(document.createTextNode(node.textContent));
        } else if (node.nodeType === Node.ELEMENT_NODE) {
          // 다른 노드(예: HTML 요소)도 새로운 요소에 추가
          newElement.appendChild(node.cloneNode(true)); // 노드를 깊은 복사
        }
      });

      // 기존 요소를 새로운 요소로 교체
      element.parentNode.replaceChild(newElement, element);
    }
  });
  highLightHover(SELECTED_ID, color, colorh);
}

function updateHighlight(color, colorh) {
  const rangeData = findRangeDataById();

  rangeData.color = color;
  updateHighLightAPI(rangeData, color, colorh);
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
  insertHighLightAPI(rangeData, colorh);
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

function highlightTextNodes(textNodes, range, color, colorh) {
  textNodes.forEach((node) => {
    const nodeRange = createNodeRange(node, range);
    const highlightBeeTag = createHighlightBeeTag(id, color);
    nodeRange.surroundContents(highlightBeeTag);
  });
  highLightHover(id, color, colorh, range);
  id++;
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
