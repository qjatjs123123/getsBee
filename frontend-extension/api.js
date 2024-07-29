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

// // 하이라이트 insert
// function processHighlight(data, colorh) {
//   insertHighLight(data);
//   const highlightRange = createRangeObject(data);
//   const textNodes = findTextNodesInRange(highlightRange);
//   highlightTextNodes(textNodes, highlightRange, data.color, colorh);
// }

// async function insertHighLightAPI(data) {
//   try {
//     const responseData = await postHighlightData(data);
//     data.id = responseData.id;
//     processHighlight(data, getHoverColor(data.color));
//   } catch (error) {
//     console.error("Error:", error);
//     return "ERROR";
//   }
// }

// async function postHighlightData(data) {
//   const response = await fetch("http://192.168.137.1:8080/api/v1/highlights", {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify(data),
//   });

//   if (!response.ok) {
//     throw new Error("Network response was not ok");
//   }

//   return await response.json();
// }

// // 하이라이트 update
// async function updateHighlightData(data) {
//   const response = await fetch(
//     `http://192.168.137.1:8080/api/highlights/${SELECTED_ID}`,
//     {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(data.color),
//     }
//   );

//   if (!response.ok) {
//     throw new Error("Network response was not ok");
//   }

//   return await response.json();
// }

// function updateHighLightAPI(color, colorh) {
//   try {
//     // api 성공하면 프론트에서는 id값과 range값 변환해서 저장하기
//     //const id = '호출API'
//     updateHighlightData();
//     updateColorById(color, colorh);
//   } catch (error) {
//     return "ERROR";
//   }
// }

// // 하이라이트 delete
// async function deleteHighlightData() {
//   const response = await fetch(
//     `http://192.168.137.1:8080/api/highlights/${SELECTED_ID}`,
//     {
//       method: "DELETE",
//       headers: {
//         "Content-Type": "application/json",
//       },
//     }
//   );

//   if (!response.ok) {
//     throw new Error("Network response was not ok");
//   }

//   return await response.json();
// }

// function deleteHighLightAPI() {
//   try {
//     // api 성공하면 프론트에서는 id값과 range값 변환해서 저장하기
//     //const id = '호출API'
//     deleteHighlightData();
//     deleteHighlight();
//   } catch (error) {
//     return "ERROR";
//   }
// }

// // 하이라이트 select
