const { mockHtml } = require('../mock/mockHtml.js');
const { selectionModel } = require('../../public/model/selectionModel.js');
const { HighlightDTO } = require('../../public/dto/highlightDTO.js');

describe("highlightDTO 테스트", () => {
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
  });

  test("highlightDTO가 정상적으로 생성된다.", () => {
    // given
    const highlightParam = {
      color : 'yello',
      range : selectionModel.range,
      url : "https://test.com",
      thumbnailUrl: "https://test.com/thumbnail.jpg",
      title: "Test Highlight",
      type: "TEXT",
      is_deleted: false,
      is_updated: false,
    }

    // When: HighlightDTO 객체 생성
    const highlightDTO = new HighlightDTO(highlightParam);
    
    // then
    expect(highlightDTO).toBeInstanceOf(HighlightDTO);
    expect(highlightDTO.url).toBe("https://test.com"); 
    expect(highlightDTO.thumbnailUrl).toBe("https://test.com/thumbnail.jpg"); 
    expect(highlightDTO.title).toBe("Test Highlight"); 
    expect(highlightDTO.color).toBe('yello');

    expect(Array.isArray(JSON.parse(highlightDTO.startIndex))).toBe(true); 
    expect(JSON.parse(highlightDTO.startIndex).length).toBeGreaterThan(0); 

    expect(Array.isArray(JSON.parse(highlightDTO.lastIndex))).toBe(true); 
    expect(JSON.parse(highlightDTO.lastIndex).length).toBeGreaterThan(0);

    expect(highlightDTO.startOffset).toBeGreaterThanOrEqual(0); // startOffset이 0 이상인지 확인
    expect(highlightDTO.lastOffset).toBeGreaterThanOrEqual(0);
  });

  test("getStringifyRange함수는 range객체를 JSON 형식의 문자열로 변환한다." ,() => {
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

    // When: HighlightDTO 객체 생성
    const highlightDTO = new HighlightDTO(highlightParam);
    highlightDTO.setId(1);

    // Then: getStringifyRange 호출 및 결과 확인
    const result = highlightDTO.getStringifyRange();
    expect(result).toEqual(expect.objectContaining({
      url: "https://test.com",
      thumbnailUrl: "https://test.com/thumbnail.jpg",
      title: "Test Highlight",
      color: 'yellow',
      content: expect.any(String),
      startIndex:  expect.any(String),
      startOffset: expect.any(Number),
      lastIndex:  expect.any(String),
      lastOffset: expect.any(Number),
      type: "TEXT",
      is_deleted: false,
      is_updated: false,
      id: 1
    }));

    expect(Array.isArray(JSON.parse(highlightDTO.startIndex))).toBe(true); 
    expect(JSON.parse(highlightDTO.startIndex).length).toBeGreaterThan(1); 

    expect(Array.isArray(JSON.parse(highlightDTO.lastIndex))).toBe(true); 
    expect(JSON.parse(highlightDTO.lastIndex).length).toBeGreaterThan(1);
  });

  test("getParseRange함수는 DTO객체를 range객체로 변환한다.", () => {
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

    // When: HighlightDTO 객체 생성
    const highlightDTO = new HighlightDTO(highlightParam);
    highlightDTO.setId(1);

    // then
    const highlightRange = highlightDTO.getParseRange();
    
    expect(highlightRange).toBeInstanceOf(Range);
    expect(highlightRange.toString().trim()).toBe("안남식 삼성전자 동남아총괄 미얀마지점장(부장)은 “삼성전자는 러브앤드케어 프로그램뿐 아니라 다양한 사회 공헌 활동을 통해 미얀마에서 더욱 사랑 받는 브랜드가 되도록 노력할 것”이라고 말했습니다.");
  });

  test("getter 메서드들이 올바른 값을 반환한다.", () => {
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

    // When: HighlightDTO 객체 생성 && getter 메서드를 호출한다.
    const highlightDTO = new HighlightDTO(highlightParam);
    highlightDTO.setId(1);

    const color = highlightDTO.color;
    const url = highlightDTO.url;
    const thumbnailUrl = highlightDTO.thumbnailUrl;
    const title = highlightDTO.title;
    const content = highlightDTO.content;
    const startIndex = highlightDTO.startIndex;
    const startOffset = highlightDTO.startOffset;
    const lastIndex = highlightDTO.lastIndex;
    const lastOffset = highlightDTO.lastOffset;
    const type = highlightDTO.type;
    const is_deleted = highlightDTO.is_deleted;
    const is_updated = highlightDTO.is_updated;

    // then

    expect(color).toBe('yellow');
    expect(url).toBe('https://test.com');
    expect(thumbnailUrl).toBe('https://test.com/thumbnail.jpg');
    expect(title).toBe('Test Highlight');
    expect(content.length).toBeGreaterThanOrEqual(0);
    expect(Array.isArray(JSON.parse(startIndex))).toBe(true); 
    expect(JSON.parse(startIndex).length).toBeGreaterThan(0); 
    expect(Array.isArray(JSON.parse(lastIndex))).toBe(true); 
    expect(JSON.parse(lastIndex).length).toBeGreaterThan(0);
    expect(startOffset).toBeGreaterThanOrEqual(0); 
    expect(lastOffset).toBeGreaterThanOrEqual(0);
    expect(type).toBe('TEXT');
    expect(is_deleted).toBe(false);
    expect(is_updated).toBe(false);
  });

})