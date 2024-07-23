/**
 * Selection 객체로 마우스 드래그 한 텍스트 추출할 수 있음
 * Selection 에서 Range 객체로 텍스트 범위를 설정 및 추출 할 수 있음
 * 드래그 후 selection.getRangeAt(0); 호출하면 드래그 한 범위를 추출 할 수 있음
 * 만약 백엔드에서 Range객체를 생성할 경우 필요한 것은 startNode, startNodeOffset, endNode, endNodeOffset 필요함
 *
 */

/**
 * 발생한 문제
 * 1. Range 객체 생성 후 deleteContents()를 하게 되면 텍스트만 삭제가 됨, 하지만 태그들은 삭제가 되지 않는 문제 발생
 * => 이 문제를 해결하기 위해서 cleanUpEmptyTags()함수를 호출함
 * => 이 함수는 img, hr, br 등을 제외하고 텍스트가 없는 빈 태그들은 삭제 함 (해결 완료)
 *
 * 2. Range 객체 저장 어떻게 해야할지
 *  => getTrack() 함수는 DOM 트리를 기준으로 인덱스를 찾음,
 *  => getReverseTrack() 함수는 HTML 기준으로 인덱스를 통해 역 추적 후 startNode와 endNode를 찾을 수 있음
 *  => startNode, endNode를 해당 함수로 찾고, 저장한 startOffset, endOffset을 통해 Range를 설정 가능함
 *
 *
 */

//////////////////////////////////////////////////////////////////////////////////////

/**
 * range 객체를 html 형식으로 바꾸는 함수
 *
 * range를 html 형식으로 바꿀 때에는 임시 div생성 후 innerHtml로 만들어야 함
 *
 */
function convertStringHTML(range, isParent) {
  if (!range) return;
  const documentFragment = range.cloneContents();
  const div = document.createElement("div");
  div.appendChild(documentFragment);
  let htmlString = div.innerHTML;
  if (!isParent) htmlString = `<span>${htmlString}<span>`;
  return htmlString;
}

/**
 * GPT 딸깍한 함수
 * Range 범위의 시작과 끝을 포함하는 가장 큰 부모 노드를 찾기 위한 함수
 */
function convertParentRange(range) {
  const copyRange = range.cloneRange(); // 범위를 복제하여 변경할 수 있는 안전한 복사본을 만듭니다.

  // 범위의 시작과 끝을 포함하는 가장 큰 부모 노드를 찾습니다.
  let startNode = range.startContainer;
  let endNode = range.endContainer;

  // 텍스트 노드가 아닌 요소 노드를 찾을 때까지 부모를 타고 올라갑니다.
  while (startNode.nodeType !== Node.ELEMENT_NODE) {
    startNode = startNode.parentNode;
  }
  while (endNode.nodeType !== Node.ELEMENT_NODE) {
    endNode = endNode.parentNode;
  }

  // 범위의 시작과 끝을 포함하는 가장 큰 부모 노드를 찾기 위해 범위를 확장합니다.
  const commonAncestor = findCommonAncestor(startNode, endNode);

  // 복제된 범위의 시작과 끝을 설정합니다.
  copyRange.setStart(commonAncestor, 0);
  copyRange.setEnd(commonAncestor, commonAncestor.childNodes.length);
  return copyRange; // 새로운 범위를 반환합니다.
}

// 두 노드의 공통 조상 노드를 찾는 함수
function findCommonAncestor(node1, node2) {
  // 두 노드의 부모를 타고 올라가면서 공통 조상 노드를 찾습니다.
  const ancestors1 = new Set();
  let current = node1;

  while (current) {
    ancestors1.add(current);
    current = current.parentNode;
  }

  current = node2;
  while (current) {
    if (ancestors1.has(current)) {
      return current;
    }
    current = current.parentNode;
  }

  return null; // 공통 조상이 없으면 null 반환
}

/**
 * 정규식 `> 문자열 < ` 태그 사이 문자열을 찾기 위한 정규식 함수
 * ex) <h1>안녕하세요</h1><p>12312</p>
 * => 안녕하세요, '', 12312 가 저장됨
 * => stringArr은 기존 문자열, 하이라이트 문자열이 저장됨
 * => 원복 하기 위해서 기존 문자열도 저장하려고 함
 */
function extractString(htmlString) {
  const stringArr = [];

  const regex = />([^<]+)</g;
  let match;

  while ((match = regex.exec(htmlString)) !== null) {
    const tmpStr = match[1];

    if (tmpStr === "" || tmpStr === "\n") continue;
    stringArr.push({
      origin: tmpStr,
      new: `<span style="background-color: rgb(255, 255, 131);">${tmpStr}</span>`,
    });
  }
  return stringArr;
}

/**
 * GPT 딸깍 함수
 * range 부모 태그 기준으로 빈태그 삭제하는 함수
 */
function cleanUpEmptyTags(node) {
  const nonEmptyTags = ["img", "br", "hr"]; // List of tags that should not be deleted even if empty

  function removeEmptyTags(element) {
    const nodesToRemove = [];

    Array.from(element.childNodes).forEach((child) => {
      if (child.nodeType === Node.ELEMENT_NODE) {
        // Recursive call for child elements
        removeEmptyTags(child);

        // Check if the child element is empty after recursion
        if (
          child.textContent.trim() === "" &&
          child.childElementCount === 0 &&
          !nonEmptyTags.includes(child.tagName.toLowerCase())
        ) {
          nodesToRemove.push(child);
        }
      }
    });

    // Now remove the collected nodes
    nodesToRemove.forEach((node) => {
      element.removeChild(node);
    });
  }

  // Perform cleanup for the root node
  removeEmptyTags(node);

  // After cleaning children, check the root node itself
  if (
    node.nodeType === Node.ELEMENT_NODE &&
    node.textContent.trim() === "" &&
    node.childElementCount === 0 &&
    !nonEmptyTags.includes(node.tagName.toLowerCase())
  ) {
    node.parentNode.removeChild(node);
  }
}

/**
 * 부모 Range를 통해 찾은 부모 html변수 htmlStringParent에서 문자열을 찾고 하이라이트 문자열로 변경하는 함수
 * 이 때 정규식 사용
 *
 */
function processHighlight(htmlStringParent, parentRange, stringArr) {
  let newHTML = htmlStringParent;
  stringArr.forEach((replacement) => {
    const { origin, new: newText } = replacement;
    const regArr = escapeRegExp(origin);

    if (regArr[0].test(newHTML)) {
      newHTML = newHTML.replace(regArr[0], `>${newText}<`);
    } else {
      newHTML = newHTML.replace(regArr[1], `${newText}`);
    }
  });

  parentRange.deleteContents();
  // Create a temporary container to parse the highlighted HTML
  const tempContainer = document.createElement("div");
  tempContainer.innerHTML = newHTML;

  // Extract nodes from the temporary container
  const newFragment = document.createDocumentFragment();
  while (tempContainer.firstChild) {
    newFragment.appendChild(tempContainer.firstChild);
  }

  console.log(newHTML);
  // Insert the new nodes into the range
  parentRange.insertNode(newFragment);
  cleanUpEmptyTags(parentRange.startContainer);
}

/**
 * HTML 꼭 대기 태그까지 Node 인덱스를 찾고 저장하는 함수
 *
 */
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

/**
 *
 * HTML 태그부터 track 인덱스를 통해 range Node를 찾는 함수
 */
function getReverseTrack(rootNode, track) {
  let currentNode = rootNode;
  for (let i = track.length - 1; i >= 0; i--) {
    currentNode = currentNode.childNodes[track[i]];
  }
  return currentNode;
}

/**
 *
 * 맨앞, 맨 뒤span태그를 제거하는 함수
 */
function removeSpanTag(htmlString) {
  const numberOfCharsToRemove = 6;
  let newString = htmlString.substring(numberOfCharsToRemove);
  const endIndex = newString.length - numberOfCharsToRemove;

  // Extract the substring
  newString = newString.substring(0, endIndex);

  return newString;
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

  const htmlString = convertStringHTML(range, false);
  const stringArr = extractString(htmlString);
  const newString = removeSpanTag(htmlString);

  const parentRange = convertParentRange(highlightRange);

  // const htmlString = convertStringHTML(range, false);
  const htmlStringParent = convertStringHTML(parentRange, true);

  processHighlight(htmlString, range, stringArr);

  selection.removeAllRanges();
}

function escapeRegExp(string) {
  const escapedString = string.replace(/[.*+?^${}()|[\]\\<>]/g, "\\$&");
  // >로 시작하고 <로 끝나는 패턴을 만듭니다.
  return [
    new RegExp(`>\\s*${escapedString}\\s*<`, "g"), // 공백을 허용하는 패턴
    new RegExp(`${escapedString}`, "g"), // 공백이 없는 패턴
  ];
}

function replaceTagsWithSpan(html) {
  // 정규 표현식을 사용하여 HTML 태그를 span 태그로 변경
  return html.replace(/<\/?\w+[^>]*>/g, (match) => {
    if (match.startsWith("</")) {
      // 닫는 태그인 경우
      return "</span>";
    } else {
      // 여는 태그인 경우
      return '<span style="background-color: yellow;">';
    }
  });
}

// 사용자가 마우스를 놓을 때 하이라이트를 추가합니다
document.addEventListener("mouseup", addHighlightToSelection);
