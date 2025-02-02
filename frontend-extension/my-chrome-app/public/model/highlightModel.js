/* eslint-disable no-undef */
const highlightModel = (() => {
  const RANGE_PARSE_ARR = {};
  const RANGE_STRINGIFY_ARR = {};

  const isValidTextNode = node => node.nodeType === Node.TEXT_NODE && !/^\s*$/.test(node.nodeValue);

  function findTextNodesInRange(range) {
    function recurse(node) {
      if (range.intersectsNode(node) && isValidTextNode(node)) return [node];
      return Array.from(node.childNodes).flatMap(recurse);
    }
    return recurse(range.commonAncestorContainer);
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

  async function insertAPI(stringifyData) {
    return await apiFunc("https://getsbee.kr/api/v1/highlights", "POST", stringifyData, () => insertAPI(stringifyData));
  }

  async function updateAPI(color, id) {
    return await apiFunc(`https://getsbee.kr/api/v1/highlights/${id}`, "PATCH", { color, message: "update" }, () => updateAPI(color));
  }

  async function deleteAPI(id) {
    return await apiFunc(`https://getsbee.kr/api/v1/highlights/${id}/delete`, "POST", { message: "Delete" }, () => deleteAPI());
  }

  async function selectAPI(url) {
    const responseData = await apiFunc(`https://getsbee.kr/api/v1/highlights/list`, "POST", { url }, () => selectAPI(url));
    return responseData.data;
  }

  function removeElementByDataId(id) {
    document.querySelectorAll(`[data-id="${id}"]`).forEach(element => {
      if (element) {
        const parent = element.parentNode;
        while (element.firstChild) {
          parent.insertBefore(element.firstChild, element);
        }
        element.remove();
      }
    });
  }

  function updateColor(color, id) {
    document.querySelectorAll(`[data-id="${id}"]`).forEach(element => {
      if (element) element.style.backgroundColor = color;
    });
  }

  function deleteColor(id) {
    document.querySelectorAll(`[data-id="${id}"]`).forEach(element => {
      if (element) {
        const parent = element.parentNode;
        while (element.firstChild) {
          parent.insertBefore(element.firstChild, element);
        }
        element.remove();
      }
    });
  }

  return {
    findTextNodesInRange,
    createNodeRange,
    insertAPI,
    updateAPI,
    deleteAPI,
    selectAPI,
    removeElementByDataId,
    updateColor,
    deleteColor,
    setRANGE_PARSE_ARR: (id, parseData) => RANGE_PARSE_ARR[id] = parseData,
    getRANGE_PARSE_ARR_by_ID: id => RANGE_PARSE_ARR[id],
    deleteRANGE_PARSE_ARR: id => delete RANGE_PARSE_ARR[id],
    setRANGE_STRINGIFY_ARR: (id, parseData) => RANGE_STRINGIFY_ARR[id] = parseData,
    getRANGE_STRINGIFY_ARR: id => RANGE_STRINGIFY_ARR[id],
    deleteRANGE_STRINGIFY_ARR: id => delete RANGE_STRINGIFY_ARR[id],
    updateRANGE_STRINGIFY_ARR: (id, color) => RANGE_STRINGIFY_ARR[id].color = color
  };
})();

//module.exports = { highlightModel };