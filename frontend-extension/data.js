let selection = null;
const RANGE_DATA_ARR = [];
let SELECTED_ID = 0;

function getURL() {
  // url return
  return null;
}

function getThumbnailUrl() {
  // 썸네일 리턴
  return null;
}

function getTitle() {
  //타이틀 리턴
  return null;
}

function insertHighLight(data) {
  RANGE_DATA_ARR.push(data);
}

function createRangeData({
  content,
  startIndex,
  startOffset,
  lastIndex,
  lastOffset,
  color,
}) {
  const data = {
    url: getURL(),
    thumbnailUrl: getThumbnailUrl(),
    title: getTitle(),
    content,
    color,
    startIndex,
    startOffset,
    lastIndex,
    lastOffset,
    type: "TEXT",
  };
  return data;
}

function createRangeObject(rangeData) {
  const startNode = getReverseTrack(
    document.documentElement,
    JSON.parse(rangeData.startIndex)
  );

  const endNode = getReverseTrack(
    document.documentElement,
    JSON.parse(rangeData.lastIndex)
  );

  // Create a range for highlighting
  const highlightRange = document.createRange();

  highlightRange.setStart(startNode, rangeData.startOffset);
  highlightRange.setEnd(endNode, rangeData.lastOffset);

  return highlightRange;
}

function findRangeDataById() {
  // 배열에서 id가 일치하는 객체를 찾습니다
  return RANGE_DATA_ARR.find((obj) => obj.id === SELECTED_ID) || null;
}

function getHoverColor(color) {
  if (color === "rgb(255, 255, 131)") return YELLOW_COLOR_H;
  else if (color === "rgb(166, 255, 233)") return BLUE_COLOR_H;
  else return RED_COLOR_H;
}
