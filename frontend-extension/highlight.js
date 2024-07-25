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

function dragHighlight(range, color, name) {
  const startTrack = getTrack(range.startContainer);
  const endTrack = getTrack(range.endContainer);
  // Find the original nodes using the tracks
  const startNode = getReverseTrack(document.documentElement, startTrack);
  const endNode = getReverseTrack(document.documentElement, endTrack);

  // Create a range for highlighting
  const highlightRange = document.createRange();
  highlightRange.setStart(startNode, range.startOffset);
  highlightRange.setEnd(endNode, range.endOffset);

  const textNodes = findTextNodesInRange(highlightRange);

  highlightTextNodes(textNodes, highlightRange, color, name);
}

function findTextNodesInRange(range) {
  let textNodes = [];

  function recurse(node) {
    if (node.nodeType === Node.TEXT_NODE) {
      if (range.intersectsNode(node) && !/^\s*$/.test(node.nodeValue)) {
        textNodes.push(node);
      }
    } else {
      for (let child of node.childNodes) {
        recurse(child);
      }
    }
  }

  recurse(range.commonAncestorContainer);
  return textNodes.filter((node) => range.intersectsNode(node));
}

function highlightTextNodes(textNodes, range, color, colorh) {
  textNodes.forEach((node, index) => {
    console.log(color);
    const nodeRange = document.createRange();
    if (node === range.startContainer) {
      nodeRange.setStart(node, range.startOffset);
      if (node === range.endContainer) {
        nodeRange.setEnd(node, range.endOffset);
      } else {
        nodeRange.setEnd(node, node.nodeValue.length);
      }
    } else if (node === range.endContainer) {
      nodeRange.setStart(node, 0);
      nodeRange.setEnd(node, range.endOffset);
    } else {
      nodeRange.selectNodeContents(node);
    }
    const id = insertHighLight();
    const highlightSpan = document.createElement("bee");
    highlightSpan.style.backgroundColor = color;
    highlightSpan.style.cursor = "pointer";
    highlightSpan.dataset.id = id; // 올바른 속성 설정 방법
    nodeRange.surroundContents(highlightSpan);
  });
  highLightHover(id, color, colorh, range);
  id++;
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
        const left = event.clientX + window.scrollX + 10;
        const top = event.clientY + window.scrollY + 10;
        const new_selection = window.getSelection();
        new_selection.addRange(range); // 새로운 범위 추가
        selection = new_selection;
        console.log(range.to);
        displayTooltip(left, top);
      });
    });
  });
}

// 사용자가 마우스를 놓을 때 하이라이트를 추가합니다
// document.addEventListener("mouseup", addHighlightToSelection);
