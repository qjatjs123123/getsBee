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
      pageModel.saveChromePage(pageModel.domain,recommendModel.recommendArr, highlightModel.RANGE_STRINGIFY_ARR);

      loginModel.init();
      loginModel.login();
      
      document.addEventListener("visibilitychange", () => {
        if (document.visibilityState === "visible") {
          pageModel.saveChromePage(pageModel.domain,recommendModel.recommendArr, highlightModel.RANGE_STRINGIFY_ARR);
        } 
      });

      if(await this.isNotstartTooltip(pageModel.domain)) return;
      const tooltip = this.getToolTipElement();
      document.body.appendChild(tooltip);
      document.addEventListener("mouseup", (event) => this.onMouseUp());
      document.addEventListener("mousedown", (event) => this.onMouseDown());
      this.handleSelect();
      pageModel.saveChromePage(pageModel.domain,recommendModel.recommendArr, highlightModel.RANGE_STRINGIFY_ARR); 
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
    const CloseBtn = CloseBtnView.getHtmlElement();

    TrashBtnView.setup(trashBtn)
      .on('mousedown', e => this.onDelete())

    CloseBtnView.setup(CloseBtn)
      .on('mousedown', e => loginModel.logout())

    BTN_COLOR.forEach(({ color, hoverColor }) => {
      const colorButton = ColorBtnView.getHtmlElement();
      ColorBtnView.setup(colorButton)
        .on('mousedown', e => this.onDecideInsertOrUpdate(color, hoverColor, e) );

      colorButton.style.backgroundColor = color;
      tooltip.appendChild(colorButton);
    });

    tooltip.appendChild(trashBtn);
    tooltip.appendChild(CloseBtn);
    
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
  async isNotstartTooltip(domain) {
    const isDisabledDomain = await this.isDisableDomain(domain);
    const loginResult = await loginModel.login();
  
    if (!isDisabledDomain && loginResult) return false
    return true;
  }
  

  async handleRecommend(color) {
    highlightModel.deleteColor(selectionModel.SELECTED_ID);
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

  handleSelect() { 
    const data = LocalStorageModel.select(LOCAL_STORAGE_KEY, pageModel.url);

    for (const param of data) {

      const highlightDTO = new HighlightDTO(param);
      highlightDTO.setId(param.id);

      if (param.is_updated) {
        highlightModel.updateColor(highlightDTO.color, highlightDTO.getId());
        highlightModel.updateRANGE_STRINGIFY_ARR(highlightDTO.getId(), highlightDTO.color);  
        continue;
      }

      if (param.is_deleted) {
        highlightModel.removeElementByDataId(highlightDTO.getId());
        highlightModel.deleteRANGE_STRINGIFY_ARR(highlightDTO.getId());
      }else {  
        highlightModel.setRANGE_PARSE_ARR(param.id, highlightDTO.getParseRange())
        highlightModel.setRANGE_STRINGIFY_ARR(highlightDTO.getId(), highlightDTO.getStringifyRange()); 
        Main.renderHighlight(highlightDTO);
      }
      
    }
  }

  async handleInsert(color) {
    const param = {
      color: color,
      range : selectionModel.range,
      url : pageModel.url,
      thumbnailUrl : pageModel.thumbnailUrl,
      title : pageModel.title,
      type : "TEXT",
      is_deleted : false,
      is_updated : false,
    };
    const highlightDTO = new HighlightDTO(param);

    const apiResult = await this.executeWithErrorHandling(
      async () => await highlightModel.insertAPI(highlightDTO.getStringifyRange()), 
      ERROR_LOG.DELETE
    )

    if (!apiResult) return;
    
    this.handleInsertCallback(apiResult, highlightDTO);
  }

  handleInsertCallback(responseData, highlightDTO) {
    highlightDTO.setId(responseData.data.highlightId);

    highlightModel.setRANGE_STRINGIFY_ARR(highlightDTO.getId(), highlightDTO.getStringifyRange());  
    highlightModel.setRANGE_PARSE_ARR(highlightDTO.getId(), highlightDTO.getParseRange());

    Main.renderHighlight(highlightDTO);
    LocalStorageModel.insert(highlightDTO.getStringifyRange(), LOCAL_STORAGE_KEY);
    pageModel.saveChromePage(pageModel.domain,recommendModel.recommendArr, highlightModel.RANGE_STRINGIFY_ARR);
  }

  static renderHighlight(highlightDTO) {

    const highlightRange = highlightDTO.getParseRange();
    const textNodes = highlightModel.findTextNodesInRange(highlightRange);
    textNodes.forEach((node) => {
      const nodeRange = highlightModel.createNodeRange(node, highlightRange);
      const highlightBeeTag = HighlightView.create(highlightDTO.getId(), highlightDTO.color);

      nodeRange.surroundContents(highlightBeeTag);
    });
  }

  async handleUpdate(color) {

    const apiResult = await this.executeWithErrorHandling(
      async () => await highlightModel.updateAPI(color, selectionModel.SELECTED_ID), 
      ERROR_LOG.UPDATE
    )

    if (!apiResult) return;

    this.handleUpdateCallback(color);  
  }

  handleUpdateCallback(color) {
    highlightModel.updateColor(color, selectionModel.SELECTED_ID);

      const range = highlightModel.getRANGE_PARSE_ARR_by_ID(selectionModel.SELECTED_ID);

      const param = {
        color: color,
        range : range,
        url : pageModel.url,
        thumbnailUrl : pageModel.thumbnailUrl,
        title : pageModel.title,
        type : "TEXT",
        is_deleted : false,
        is_updated : true,
      };
      const highlightDTO = new HighlightDTO(param);
      highlightDTO.setId(selectionModel.SELECTED_ID);
      
      highlightModel.updateRANGE_STRINGIFY_ARR(highlightDTO.getId(), highlightDTO.color);  

      LocalStorageModel.insert(highlightDTO.getStringifyRange(), LOCAL_STORAGE_KEY);
      pageModel.saveChromePage(pageModel.domain,recommendModel.recommendArr, highlightModel.RANGE_STRINGIFY_ARR);
  }

  async handleDelete() {

    const apiResult = await this.executeWithErrorHandling(
      async () => await highlightModel.deleteAPI(selectionModel.SELECTED_ID), 
      ERROR_LOG.DELETE
    )

    if (!apiResult) return;

    this.handleDeleteCallback();
  }

  handleDeleteCallback() {
    highlightModel.deleteColor(selectionModel.SELECTED_ID);
    const range = highlightModel.getRANGE_PARSE_ARR_by_ID(selectionModel.SELECTED_ID);

    const param = {
      color: "00000",
      range : range,
      url : pageModel.url,
      thumbnailUrl : pageModel.thumbnailUrl,
      title : pageModel.title,
      type : "TEXT",
      is_deleted : true,
      is_updated : false,
    };

    const highlightDTO = new HighlightDTO(param);
    highlightDTO.setId(selectionModel.SELECTED_ID);

    LocalStorageModel.insert(highlightDTO.getStringifyRange(), LOCAL_STORAGE_KEY);
    highlightModel.deleteRANGE_PARSE_ARR(selectionModel.SELECTED_ID);
    highlightModel.deleteRANGE_STRINGIFY_ARR(selectionModel.SELECTED_ID);

    pageModel.saveChromePage(pageModel.domain,recommendModel.recommendArr, highlightModel.RANGE_STRINGIFY_ARR);
  }

  async executeWithErrorHandling(asyncFunction, errorMessage) {
    try {
      const responseData = await asyncFunction();
      if (responseData.status === 200) return responseData
      return false;
    } catch (error) {
      console.error(errorMessage, error);
      return false;
    }
  }
}

module.exports = { Main };