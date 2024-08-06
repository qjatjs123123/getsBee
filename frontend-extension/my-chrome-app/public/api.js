/* eslint-disable no-undef */

// 하이라이트 insert
function processHighlight(data, colorh) {
  insertHighLight(data);
  const highlightRange = createRangeObject(data);
  const textNodes = findTextNodesInRange(highlightRange);
  highlightTextNodes(textNodes, highlightRange, data.color, colorh, data);
}

async function insertHighLightAPI(data) {
  try {
    const responseData = await postHighlightData(data);
    data.id = responseData.data.highlightId;
    processHighlight(data, getHoverColor(data.color));
  } catch (error) {
    console.error("Error:", error);
    return "ERROR";
  }
}

async function postHighlightData(data) {
  const response = await fetch("https://getsbee.kr/api/v1/highlights", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify(data),
  });
  if (response.status === 401) {
    window.location.href = "http://localhost:5173/about";
    // 필요에 따라 추가 처리 (예: 사용자에게 재로그인 요청)
    throw new Error("Network response was not ok");
  }

  return await response.json();
}

// // 하이라이트 update
async function updateHighlightData(data) {
  const response = await fetch(
    `https://getsbee.kr/api/v1/highlights/${SELECTED_ID}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(data.color),
    }
  );

  if (response.status === 401) {
    console.log(response, data);
    // window.location.href = "http://localhost:5173/about";
    // 필요에 따라 추가 처리 (예: 사용자에게 재로그인 요청)
    throw new Error("Network response was not ok");
  }

  return await response.json();
}

async function updateHighLightAPI(data, color, colorh) {
  try {
    // api 성공하면 프론트에서는 id값과 range값 변환해서 저장하기
    //const id = '호출API'
    await updateHighlightData(data);
    updateColorById(color, colorh);
  } catch (error) {
    console.log(error);
    return "ERROR";
  }
}

// // 하이라이트 delete
async function deleteHighlightData() {
  console.log("123");
  const response = await fetch(
    `https://getsbee.kr/api/v1/highlights/${SELECTED_ID}`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );

  if (response.status === 401) {
    window.location.href = "http://localhost:5173/about";
    // 필요에 따라 추가 처리 (예: 사용자에게 재로그인 요청)
    throw new Error("Network response was not ok");
  }
  console.log(response.status);
  return await response.json();
}

async function deleteHighLightAPI() {
  try {
    // api 성공하면 프론트에서는 id값과 range값 변환해서 저장하기
    //const id = '호출API'
    await deleteHighlightData();
    deleteHighlight();
  } catch (error) {
    console.log(error);
    return "ERROR";
  }
}

// // 하이라이트 select
