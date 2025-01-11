/* eslint-disable no-undef */
const { mockHeader } = require('../mock/mockHeader.js');
const { pageModel } = require('../../public/model/pageModel.js');

describe("pageModel 테스트", () => {
  beforeEach(() => {
    document.body.innerHTML = mockHeader;

    Object.defineProperty(window, "location", {
      value: {
        href: "https://test.com/page",
        hostname: "test.com",
      },
      writable: true,
    });
  })

  test("init(): 초기 접속 시 페이지 정보(domain, url, thumbnailUrl, title)를 추출한다.", () => {
    //when
    pageModel.init();

    //then
    expect(pageModel.domain).toBe("test.com");
    expect(pageModel.url).toBe("https://test.com/page");
    expect(pageModel.thumbnailUrl).toBe("test-thumbnail.jpg");
    expect(pageModel.title).toBe("Test Page Title");
  })

  test("saveChromePage(): 초기 접속 시 페이지 정보(domain, url, thumbnailUrl, title)를 로컬 크롬 스토리지에 저장한다다.", () => {
    //when
    pageModel.init();
    global.chrome = {
      storage: {
        local: {
          set: jest.fn((data, callback) => callback()),
        },
      },
    };

    const domain = "test.com";
    const recommendArr = ["recommend1", "recommend2"];
    const highlightArr = ["highlight1", "highlight2"];

    pageModel.saveChromePage(domain, recommendArr, highlightArr);

    //then
    expect(chrome.storage.local.set).toHaveBeenCalledTimes(1);
    expect(chrome.storage.local.set).toHaveBeenCalledWith(
      expect.any(Object), 
      expect.any(Function) 
    );
  })
})