/* eslint-disable no-undef */
class Main {
  static disable = false;
  /**
   * 초기화 메서드
   * 
   * 1. 툴팁 ui를 생성한다.
   * 2. 툴팁 활성/비활성화 이벤트를 발생한다.
   */
  init() {

    window.addEventListener("load", async() => {
      pageModel.init();
      recommendModel.init();
      
      Main.disable = await this.isDisableDomain(pageModel.domain);
      if (Main.disable) return;

      const tooltip = this.getToolTipElement();
      document.body.appendChild(tooltip);

      loginModel.init();
      
      loginModel.saveChromePage(pageModel.domain);
      
      document.addEventListener("mouseup", (event) => this.onMouseUp());
      document.addEventListener("mousedown", (event) => this.onMouseDown());

      loginModel.login();
      this.handleSelect();
    });

  }

  async isDisableDomain(domain) {
    return new Promise((resolve, reject) => {
      chrome.storage.sync.get([domain], (result) => {
        const isDisable = result[domain] || false;
        resolve(isDisable);
      });
    });
  }

  /**
   * 툴팁 UI를 자바스크립트로 생성하는 함수
   */
  getToolTipElement () {
    const tooltip = TooltipView.getHtmlElement();
    TooltipView.setup(tooltip);

    const trashBtn = TrashBtnView.getHtmlElement();
    TrashBtnView.setup(trashBtn)
      .on('mousedown', e => this.onDelete())

    BTN_COLOR.forEach(({ color, hoverColor }) => {
      const colorButton = ColorBtnView.getHtmlElement();
      ColorBtnView.setup(colorButton)
        .on('mousedown', e => this.onDecideInsertOrUpdate(color, hoverColor, e) );

      colorButton.style.backgroundColor = color;
      tooltip.appendChild(colorButton);
    });

    tooltip.appendChild(trashBtn);

    return tooltip;
  }

  /**
   * 하이라이트 삭제 이벤트
   */
  async onDelete() {
    await this.handleDelete();
  }


  /**
   * 하이라이트 생성 할지 수정할지 이벤트
   */
  onDecideInsertOrUpdate(color, hoverColor, e) {
    // Insert
    if (selectionModel.isTextSelected(window.getSelection().getRangeAt(0))){
      this.handleInsert(color, hoverColor);
      return;
    }
    // Update
    if (selectionModel.SELECTED_ID >= 0) this.handleUpdate(color)
    else this.handleRecommend(color);

    this.onMouseDown();
  }

  /**
   * 툴팁 활성 이벤트
   */
  async onMouseUp() {
    

    const result = selectionModel.create();
    if (!result) return;

    const [left, top] = selectionModel.getRectPos();
    if (!isValidPos(left, top)) return;

    TooltipView.render(left, top);
    
  }

  async handleRecommend(color) {
    highlightModel.deleteColor();
    const rangeData = recommendModel.findRecommendDataById(selectionModel.SELECTED_ID);

    const range = highlightModel.parseRange(rangeData);


    selectionModel.range = range;
    
    await this.handleInsert(color);
  }


  /**
   * 툴팁 비활성 이벤트
   */
  onMouseDown() {
    selectionModel.delete();
    TooltipView.hide();
  }

  async handleSelect() { 
    // const data = await highlightModel.selectAPI(pageModel.url);
    const data = await LocalStorageModel.select(pageModel.url);

    for (const param of data) {
      try {
        if (!param.is_deleted) {
          highlightModel.RANGE_DATA_ARR.push(param);
          highlightModel.RANGE_ARR[param.id] = highlightModel.parseRange(param);
          Main.renderHighlight(param);
        } else {
          highlightModel.removeElementByDataId(param.id);
        }
        
        if (param.is_updated) {
          const elements = document.querySelectorAll(`[data-id="${param.id}"]`);
          elements.forEach((element) => {
            if (element) {
              element.style.backgroundColor = param.color;
            }
          });
        }
      } catch (error) {
        console.error("Error processing item:", param, error);
      }
    }
  }

  async handleInsert(color, hoverColor) {
    const param = {
      color: color,
      range : selectionModel.range,
      url : pageModel.url,
      thumbnailUrl : pageModel.thumbnailUrl,
      title : pageModel.title,
    };

    const data = await highlightModel.insertAPI(param);
    const highlightRange = highlightModel.parseRange(data);
    
    highlightModel.RANGE_DATA_ARR.push(data);
    highlightModel.RANGE_ARR[data.id] = highlightRange;
    console.log(data);
    Main.renderHighlight(data);
    LocalStorageModel.insert(data, false);
  }

  static renderHighlight(data) {
    
    const highlightRange = highlightModel.parseRange(data);
    const textNodes = highlightModel.findTextNodesInRange(highlightRange);
    textNodes.forEach((node) => {
      const nodeRange = highlightModel.createNodeRange(node, highlightRange);
      const highlightBeeTag = HighlightView.create(data.id, data.color);

      nodeRange.surroundContents(highlightBeeTag);
    });
  }

  async handleUpdate(color) {
    await highlightModel.updateAPI(color);
    const range = highlightModel.RANGE_ARR[selectionModel.SELECTED_ID];

    const param = {
      color: color,
      range : range,
      url : pageModel.url,
      thumbnailUrl : pageModel.thumbnailUrl,
      title : pageModel.title,
    };

    const rangeData = highlightModel.stringifyRange(param);
    rangeData.id = selectionModel.SELECTED_ID;
    LocalStorageModel.insert(rangeData, false, true);
  }

  async handleDelete() {
    await highlightModel.deleteAPI();

    const range = highlightModel.RANGE_ARR[selectionModel.SELECTED_ID];

    const param = {
      color: "00000",
      range : range,
      url : pageModel.url,
      thumbnailUrl : pageModel.thumbnailUrl,
      title : pageModel.title,
    };

    const rangeData = highlightModel.stringifyRange(param);
    rangeData.id = selectionModel.SELECTED_ID;
    LocalStorageModel.insert(rangeData, true);
  }

}