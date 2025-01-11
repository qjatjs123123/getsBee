const { mockHtml } = require('../mock/mockHtml.js');
const { selectionModel } = require('../../public/model/selectionModel.js');
const { highlightModel } = require('../../public/model/highlightModel.js');
const { HighlightDTO } = require('../../public/dto/highlightDTO.js');
const { Main } = require('../../public/controller/MainController.js')

let highlightDTO;
describe("highlightModel 테스트", () => {
  beforeEach(() => {
    // given -> 사용자가 testID 텍스트를 selection으로 선택했다고 가정한다.
    document.body.outerHTML = mockHtml; 

    const pElement = document.getElementById('testID');

    const range = document.createRange();
    range.selectNodeContents(pElement);

    const selection = window.getSelection();
    selection.removeAllRanges(); 
    selection.addRange(range);

    selectionModel.create();

    // given
    const highlightParam = {
      color : 'yellow',
      range : selectionModel.range,
      url : "https://test.com",
      thumbnailUrl: "https://test.com/thumbnail.jpg",
      title: "Test Highlight",
      type: "TEXT",
      is_deleted: false,
      is_updated: false,
    }


    highlightDTO = new HighlightDTO(highlightParam);
    highlightDTO.setId(1);
  });

  test("하이라이트 생성 api 성공적으로 호출하면 커스텀 태그가 추가된다.", async() => {
    // when
    const mockApiResponse = { success: true }; 

    highlightModel.insertAPI = jest.fn().mockResolvedValue(mockApiResponse); 
    await highlightModel.insertAPI();


    const range = highlightDTO.getParseRange();
    const textNodes = highlightModel.findTextNodesInRange(range);

    textNodes.forEach((node) => {
      const nodeRange = highlightModel.createNodeRange(node, range);
      const highlightBeeTag = document.createElement("bee");
      highlightBeeTag.style.backgroundColor = highlightDTO.color;
      highlightBeeTag.style.cursor = "pointer";
      highlightBeeTag.dataset.id = highlightDTO.getId(); 
      nodeRange.surroundContents(highlightBeeTag);
    });

    // then
    const beeTag = document.querySelector("bee");

    expect(beeTag).not.toBeNull(); 
    expect(beeTag.style.backgroundColor).toBe(highlightDTO.color); 
    expect(beeTag.dataset.id).toBe(String(highlightDTO.getId())); 
  });

  test("하이라이트 수정 api 성공적으로 호출되면 backgroundColor 수정된다.", async() => {
    // when
    const mockApiResponse = { success: true }; 

    highlightModel.insertAPI = jest.fn().mockResolvedValue(mockApiResponse); 
    await highlightModel.insertAPI();


    const range = highlightDTO.getParseRange();
    const textNodes = highlightModel.findTextNodesInRange(range);

    textNodes.forEach((node) => {
      const nodeRange = highlightModel.createNodeRange(node, range);
      const highlightBeeTag = document.createElement("bee");
      highlightBeeTag.style.backgroundColor = highlightDTO.color;
      highlightBeeTag.style.cursor = "pointer";
      highlightBeeTag.dataset.id = highlightDTO.getId(); 
      nodeRange.surroundContents(highlightBeeTag);
    });

    // then
    highlightModel.updateColor("green", 1);
    const beeTag = document.querySelector("bee");

    expect(beeTag).not.toBeNull(); 
    expect(beeTag.style.backgroundColor).toBe("green"); 
  });

  test("하이라이트 삭제제 api 성공적으로 호출되면 커스텀 태그는 사라진다.", async() => {
    // when
    const mockApiResponse = { success: true }; 

    highlightModel.insertAPI = jest.fn().mockResolvedValue(mockApiResponse); 
    await highlightModel.insertAPI();


    const range = highlightDTO.getParseRange();
    const textNodes = highlightModel.findTextNodesInRange(range);

    textNodes.forEach((node) => {
      const nodeRange = highlightModel.createNodeRange(node, range);
      const highlightBeeTag = document.createElement("bee");
      highlightBeeTag.style.backgroundColor = highlightDTO.color;
      highlightBeeTag.style.cursor = "pointer";
      highlightBeeTag.dataset.id = highlightDTO.getId(); 
      nodeRange.surroundContents(highlightBeeTag);
    });

    // then
    highlightModel.deleteColor(1);
    const beeTag = document.querySelector("bee");

    expect(beeTag).toBeNull(); 

  });
})