/* eslint-disable no-undef */
const highlightModel = {
  RANGE_PARSE_ARR: {},
  RANGE_STRINGIFY_ARR: {},

  findTextNodesInRange(range) {
    const isValidTextNode = node => node.nodeType === Node.TEXT_NODE && !/^\s*$/.test(node.nodeValue);
    
    function recurse(node) {
      if (range.intersectsNode(node) && isValidTextNode(node)) return [node];

      return Array.from(node.childNodes).flatMap(recurse);
    }
  
    return recurse(range.commonAncestorContainer);
  },


  createNodeRange(node, range) {
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
  },
  
  
  async insertAPI(stringifyData) {
    const responseData = await apiFunc(
      "https://getsbee.kr/api/v1/highlights", 
      "POST", 
      stringifyData, 
      (stringifyData) => this.insertAPI(stringifyData)
    );

    return responseData;

  },

  async updateAPI(color, id) {
    const data = {
      color : color,
      message: "update",
    }

    const responseData = await apiFunc(
      `https://getsbee.kr/api/v1/highlights/${id}`, 
      "PATCH",
      data, 
      (color) => this.updateAPI(color)
    );

    return responseData;
  },

  async deleteAPI(id) {
    const responseData = await apiFunc(
      `https://getsbee.kr/api/v1/highlights/${id}/delete`,
      "POST",
      { message: "Delete" }, 
      () => this.deleteAPI()
    );
    
    return responseData;
  },

  async selectAPI(url) {
    const responseData = await apiFunc(
      `https://getsbee.kr/api/v1/highlights/list`,
      "POST",
      { url: url }, 
      () => this.deleteAPI()
    );
    return responseData.data;
  },

  removeElementByDataId(id) {
    const elements = document.querySelectorAll(`[data-id="${id}"]`);
  
    elements.forEach((element) => {
      if (element) {
        const parent = element.parentNode;
        while (element.firstChild) {
          parent.insertBefore(element.firstChild, element);
        }
        element.remove();
      }
    });
  },

  updateColor(color, id) {
    const elements = document.querySelectorAll(`[data-id="${id}"]`);
    elements.forEach((element) => {
      if (element) {
        element.style.backgroundColor = color;
      }
    });
  },
  
  deleteColor(id) {
    const elements = document.querySelectorAll(`[data-id="${id}"]`);
  
    elements.forEach((element) => {
      if (element) {
        const parent = element.parentNode;
        while (element.firstChild) {
          parent.insertBefore(element.firstChild, element);
        }
        element.remove();
      }
    });
  },
  
  setRANGE_PARSE_ARR(id, parseData)  {
    highlightModel.RANGE_PARSE_ARR[id] = parseData; 
  },
  getRANGE_PARSE_ARR_by_ID(id) {
    return highlightModel.RANGE_PARSE_ARR[id]
  },
  deleteRANGE_PARSE_ARR(id) {
    delete highlightModel.RANGE_PARSE_ARR[id];
  },

  setRANGE_STRINGIFY_ARR(id, parseData)  {
    highlightModel.RANGE_STRINGIFY_ARR[id] = parseData; 
  },
  getRANGE_STRINGIFY_ARR(id) {
    return highlightModel.RANGE_STRINGIFY_ARR[id]
  },
  deleteRANGE_STRINGIFY_ARR(id) {
    delete highlightModel.RANGE_STRINGIFY_ARR[id];
  },
  updateRANGE_STRINGIFY_ARR(id, color) {
    highlightModel.RANGE_STRINGIFY_ARR[id].color = color;
  }
}

module.exports = { highlightModel };