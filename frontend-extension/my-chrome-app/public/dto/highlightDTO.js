class HighlightDTO {
  #url
  #thumbnailUrl
  #title
  #content
  #color
  #startIndex
  #startOffset
  #lastIndex
  #lastOffset
  #type
  #is_deleted
  #is_updated
  #id

  constructor({ color, range, url, thumbnailUrl, title, type, is_deleted, is_updated, startIndex,  startOffset, lastIndex, lastOffset }) {
    this.#url = url;
    this.#thumbnailUrl = thumbnailUrl;
    this.#title = title;
    this.#color = color;
    this.#type = type; 
    this.#is_deleted = is_deleted; 
    this.#is_updated = is_updated; 
    this.#startIndex = startIndex;
    this.#startOffset = startOffset
    this.#lastIndex = lastIndex;
    this.#lastOffset = lastOffset;

    if (range){
      this.#content = range.toString();
      this.#startIndex = JSON.stringify(this.#getTrack(range.startContainer));
      this.#startOffset = range.startOffset;
      this.#lastIndex = JSON.stringify(this.#getTrack(range.endContainer));
      this.#lastOffset = range.endOffset;

      return;
    }
   
    this.#content = this.getParseRange().toString();
    
  }

  #getTrack(Node) {
    const track = [];
    while (Node.nodeName !== "BODY") {
      const siblingNodes = Array.from(Node.parentNode.childNodes);
      for (let i = 0; i < siblingNodes.length; i++) {
        if (siblingNodes[i] === Node) track.push(i);
      }
  
      Node = Node.parentNode;
    }
  
    return track;
  }
  
  #getReverseTrack(rootNode, track) {
    let currentNode = rootNode;
    for (let i = track.length - 1; i >= 0; i--) {
      currentNode = currentNode.childNodes[track[i]];
    }
    return currentNode;
  }

  getParseRange() {
    const startNode = this.#getReverseTrack(
      document.body,
      JSON.parse(this.#startIndex)
    );

    const endNode = this.#getReverseTrack(
      document.body,
      JSON.parse(this.#lastIndex)
    );

    const highlightRange = document.createRange();
    highlightRange.setStart(startNode, this.#startOffset);
    highlightRange.setEnd(endNode, this.#lastOffset);
    return highlightRange;
  }

  getStringifyRange() {
    return {
      url: this.#url,
      thumbnailUrl: this.#thumbnailUrl,
      title: this.#title,
      color: this.#color,
      content: this.#content,
      startIndex: this.#startIndex,
      startOffset: this.#startOffset,
      lastIndex: this.#lastIndex,
      lastOffset: this.#lastOffset,
      type: this.#type,
      is_deleted: this.#is_deleted,
      is_updated: this.#is_updated,
      id: this.#id
    };
  }

  get url() {
    return this.#url;
  }

  get thumbnailUrl() {
    return this.#thumbnailUrl;
  }

  get title() {
    return this.#title;
  }

  get color() {
    return this.#color;
  }

  get content() {
    return this.#content;
  }

  get startIndex() {
    return this.#startIndex;
  }

  get startOffset() {
    return this.#startOffset;
  }

  get lastIndex() {
    return this.#lastIndex;
  }

  get lastOffset() {
    return this.#lastOffset;
  }

  get type() {
    return this.#type;
  }

  get is_deleted() {
    return this.#is_deleted;
  }

  get is_updated() {
    return this.#is_updated;
  }

  setId(id) {
    this.#id = id; 
  }

  getId() {
    return this.#id;
  }
}

module.exports = { HighlightDTO };