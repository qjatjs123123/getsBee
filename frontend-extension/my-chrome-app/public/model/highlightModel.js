/* eslint-disable no-undef */
const highlightModel = {
  RANGE_ARR: {},
  RANGE_DATA_ARR:[],

  stringifyRange({ color, range, url, thumbnailUrl, title }) {

    return {
      url: url,
      thumbnailUrl: thumbnailUrl,
      title: title,
      content: range.toString(),
      color: color,
      startIndex: JSON.stringify(this.getTrack(range.startContainer)),
      startOffset: range.startOffset,
      lastIndex: JSON.stringify(this.getTrack(range.endContainer)),
      lastOffset: range.endOffset,
      type: "TEXT",
    };
  },

  parseRange(rangeData) {
    const startNode = this.getReverseTrack(
      document.documentElement,
      JSON.parse(rangeData.startIndex)
    );
  
    const endNode = this.getReverseTrack(
      document.documentElement,
      JSON.parse(rangeData.lastIndex)
    );
  
    const highlightRange = document.createRange();
    highlightRange.setStart(startNode, rangeData.startOffset);
    highlightRange.setEnd(endNode, rangeData.lastOffset);
    return highlightRange;
  },

  getTrack(Node) {
    const track = [];
    while (Node.nodeName !== "HTML") {
      const siblingNodes = Array.from(Node.parentNode.childNodes);
      for (let i = 0; i < siblingNodes.length; i++) {
        if (siblingNodes[i] === Node) track.push(i);
      }
  
      Node = Node.parentNode;
    }
  
    return track;
  },
  
  getReverseTrack(rootNode, track) {
    let currentNode = rootNode;
    for (let i = track.length - 1; i >= 0; i--) {
      currentNode = currentNode.childNodes[track[i]];
    }
    return currentNode;
  },

  findTextNodesInRange(range) {
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
  
  
  async insertAPI(param) {
    const data = this.stringifyRange(param);
    const responseData = await apiFunc("https://getsbee.kr/api/v1/highlights", "POST", data, (param) => this.insertAPI(param));
    data.id = responseData.data.highlightId;

    return data;


    //insertLocalStorage(data, true);

  },

  async updateAPI(color) {
    const data = {
      color : color,
      message: "update",
    }

    const responseData = await apiFunc(
      `https://getsbee.kr/api/v1/highlights/${selectionModel.SELECTED_ID}`, 
      "PATCH",
      data, 
      (color) => this.updateAPI(color)
    );

    this.updateColor(color);
  },

  async deleteAPI() {
    const responseData = await apiFunc(
      `https://getsbee.kr/api/v1/highlights/${selectionModel.SELECTED_ID}/delete`,
      "POST",
      { message: "Delete" }, 
      () => this.deleteAPI()
    );

    this.deleteColor();
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

  updateColor(color) {
    const elements = document.querySelectorAll(`[data-id="${selectionModel.SELECTED_ID}"]`);
    elements.forEach((element) => {
      if (element) {
        element.style.backgroundColor = color;
      }
    });
  },
  
  deleteColor() {
    const elements = document.querySelectorAll(`[data-id="${selectionModel.SELECTED_ID}"]`);
  
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
}