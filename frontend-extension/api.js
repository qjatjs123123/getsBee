let id = 1;

// 하이라이트 넣기
function insertHighLightAPI(data, colorh) {
  try {
    // api 성공하면 프론트에서는 id값과 range값 변환해서 저장하기
    //const id = '호출API'
    data.id = id;

    insertHighLight(data);
    const highlightRange = createRangeObject(data);
    const textNodes = findTextNodesInRange(highlightRange);
    highlightTextNodes(textNodes, highlightRange, data.color, colorh);
  } catch (error) {
    return "ERROR";
  }
}

function updateHighLightAPI(data, color, colorh) {
  try {
    // api 성공하면 프론트에서는 id값과 range값 변환해서 저장하기
    //const id = '호출API'
    updateColorById(color, colorh);
  } catch (error) {
    return "ERROR";
  }
}
