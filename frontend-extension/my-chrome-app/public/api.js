/* eslint-disable no-undef */

// 하이라이트 insert
function processHighlight(data, colorh) {
  insertHighLight(data);
  const highlightRange = createRangeObject(data);
  RANGE_ARR.push(highlightRange);

  const textNodes = findTextNodesInRange(highlightRange);
  highlightTextNodes(textNodes, highlightRange, data.color, colorh, data);
}

async function insertHighLightAPI(data) {
  try {
    const responseData = await postHighlightData(data);
    data.id = responseData.data.highlightId;
    processHighlight(data, getHoverColor(data.color));
  } catch (error) {
    console.log(error);
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
    loginCheck(401, () => insertHighLightAPI(data));
    // window.location.href = "https://getsbee.kr/";
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
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({ color: data.color }),
    }
  );

  if (response.status === 401) {
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
    loginCheck(401, () => updateHighLightAPI(data, color, colorh));
  }
}

// // 하이라이트 delete
async function deleteHighlightData() {
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
    loginCheck(401, () => deleteHighLightAPI());
    throw new Error("Network response was not ok");
  }

  return await response.json();
}

async function deleteHighLightAPI() {
  try {
    // api 성공하면 프론트에서는 id값과 range값 변환해서 저장하기
    //const id = '호출API'
    await deleteHighlightData();
    deleteHighlight();
    const changeData = updateRangeInfo();
    await updateRangeDataAPI(changeData);
  } catch (error) {
    console.log(error);
  }
}

async function updateRangeDataAPI(UpdateIndexHighlight) {
  const response = await fetch(`https://getsbee.kr/api/v1/highlights/update`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify(UpdateIndexHighlight),
  });

  if (response.status === 401) {
    // 필요에 따라 추가 처리 (예: 사용자에게 재로그인 요청)
    throw new Error("Network response was not ok");
  }

  return await response.json();
}

async function loginCheck(status, callback) {
  chrome.storage.sync.get(["GETSBEE_LOGIN"], async function (result) {
    if (result.GETSBEE_LOGIN === undefined) {
      // window.location.href = "https://getsbee.kr/about";
      return;
    } else {
      if (status === 401) {
        accessToken = result.GETSBEE_LOGIN.accessToken;
        refreshToken = result.GETSBEE_LOGIN.refreshToken;

        try {
          const response = await fetch(
            `https://getsbee.kr/api/v1/auth/reissue`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ accessToken, refreshToken }),
            }
          );

          if (!response.ok) {
            throw new Error("Failed to reissue tokens");
          }

          const responseData = await response.json();

          const data = {
            accessToken: responseData.data.accessToken,
            refreshToken: responseData.data.refreshToken,
            userState: result.GETSBEE_LOGIN.userState,
          };
          accessToken = data.accessToken;
          refreshToken = data.refreshToken;

          chrome.storage.sync.set({ GETSBEE_LOGIN: data }, function () {
            chrome.runtime.sendMessage({
              type: "SEND_BROWSER_INFO",
              hostName: getDomain(),
              resultArr: resultArr,
              HTMLContent: document.documentElement.outerHTML,
              accessToken,
              refreshToken,
              userState,
            });

            callback(); // 토큰 갱신 후 콜백 함수 실행
          });
        } catch (error) {
          //window.location.href = "https://getsbee.kr/about"; // 필요 시 로그인 페이지로 리다이렉션
        }
      }
    }
  });
}

// // 하이라이트 select
function processSelect(params) {
  for (const param of params) {
    try {
      param.id = param.highlightId;
      processHighlight(param, getHoverColor(param.color));
    } catch (error) {
      console.error("Error processing item:", param, error);
      // 오류가 발생해도 다음 항목으로 계속 진행합니다.
    }
  }
}

async function selectHighLightAPI() {
  try {
    const responseData = await selectHighLight();
    processSelect(responseData.data);
  } catch (error) {
    console.error("Error:", error);
    return "ERROR";
  }
}

async function selectHighLight() {
  const postData = {
    url: getURL(),
  };

  const response = await fetch("https://getsbee.kr/api/v1/highlights/list", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify(postData),
  });
  if (response.status === 401) {
    loginCheck(401, () => selectHighLightAPI());
    throw new Error("Network response was not ok");
  }

  return await response.json();
}
