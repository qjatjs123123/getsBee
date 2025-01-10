/* eslint-disable no-undef */
/**
 * @jest-environment jsdom
 */
const { mockHtml } = require('../mock/mockHtml.js');
const { selectionModel } = require('../../public/model/selectionModel.js');

describe("selectionModel 테스트", () => {
  // 사용자가 testID 태그를 선택했다고 가정
  beforeEach(() => {
    document.body.outerHTML = mockHtml; 

    const pElement = document.getElementById('testID');

    const range = document.createRange();
    range.selectNodeContents(pElement);

    const selection = window.getSelection();
    selection.removeAllRanges(); 
    selection.addRange(range);
  });

  test("create(): 유효한 텍스트가 선택되면 true 반환", () => {
    // when
    const result = selectionModel.create();

    // then
    expect(result).toBe(true); 

  });

  test("create(): 정상적으로 생성되면 selection 변수는 null이 아니다.", () => {
    // when
    selectionModel.create();

    // then
    expect(selectionModel.selection).toBeTruthy(); 
    
  });

  test("create(): 정상적으로 생성되면 range 변수는 null이 아니다.", () => {
    // when
    selectionModel.create();

    // then
    expect(selectionModel.range).toBeTruthy(); 
    
  });

  test("delete(): 정상적으로 삭제되면 isValidSection 함수가 false가 된다.", () => {
    // when
    selectionModel.create();
    selectionModel.delete();

    // then
    const isValid = selectionModel.isValidSelection(selectionModel.selection); 
  expect(isValid).toBe(false);
    
  });

  test("delete(): 정상적으로 삭제되면 isTextSelected 함수가 false가 된다.", () => {
    // when
    selectionModel.create();
    selectionModel.delete();

    // then
    const isValid = selectionModel.isTextSelected(selectionModel.selection); 
  expect(isValid).toBe(false);
    
  });

  test("delete(): 정상적으로 삭제되면 range는 null이 된다.", () => {
    // when
    selectionModel.create();
    selectionModel.delete();

    // then
    const range = selectionModel.range; 
    expect(range).toBeNull();
    
  });

  test("getRectPos(): 범위를 설정하지 않으면 [null, null]을 반환한다.", () => {
    // when
    selectionModel.create();
    selectionModel.delete();
    const result = selectionModel.getRectPos();

    // then
    expect(result).toEqual([null, null]);
    
  });

  test("getRectPos(): 범위를 설정하면 좌표를 반환한다.", () => {
    // when
    const selection = {
      range: {
        getClientRects: jest.fn(),
      },
      getRectPos: selectionModel.getRectPos
    };

    global.window = {
      scrollX: 50,
      scrollY: 100,
    };

    const mockRects = [
      { right: 100, bottom: 50 }, 
      { right: 200, bottom: 100 }, 
    ];

    selection.range.getClientRects.mockReturnValue(mockRects);
    const result = selection.getRectPos();

    // then
    expect(result[0]).toBeGreaterThanOrEqual(0); 
    expect(result[1]).toBeGreaterThanOrEqual(0);
    
  });

});
