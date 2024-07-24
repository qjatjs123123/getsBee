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

function addHighlightToSelection() {
  const selection = window.getSelection();
  const range = selection.getRangeAt(0);

  const startTrack = getTrack(range.startContainer);
  const endTrack = getTrack(range.endContainer);
  // Find the original nodes using the tracks
  const startNode = getReverseTrack(document.documentElement, startTrack);
  const endNode = getReverseTrack(document.documentElement, endTrack);

  // Create a range for highlighting
  const highlightRange = document.createRange();
  highlightRange.setStart(startNode, range.startOffset);
  highlightRange.setEnd(endNode, range.endOffset);

  console.log("startContainer: ", highlightRange.startContainer);
  console.log("startOffset", highlightRange.startOffset);
  console.log("endContainer: ", highlightRange.endContainer);
  console.log("endOffset", highlightRange.endOffset);
  console.log(highlightRange.toString());

  const textNodes = findTextNodesInRange(highlightRange);

  highlightTextNodes(textNodes, highlightRange);

  selection.removeAllRanges();
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

function highlightTextNodes(textNodes, range) {
  textNodes.forEach((node, index) => {
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

    const highlightSpan = document.createElement("span");
    highlightSpan.style.backgroundColor = "rgb(255, 255, 131)";
    nodeRange.surroundContents(highlightSpan);
  });
}

// 사용자가 마우스를 놓을 때 하이라이트를 추가합니다
document.addEventListener("mouseup", addHighlightToSelection);
