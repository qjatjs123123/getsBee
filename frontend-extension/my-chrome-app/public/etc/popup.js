// import { GoogleGenerativeAI } from "@google/generative-ai";

// document.addEventListener("DOMContentLoaded", () => {
//   async function run() {
//     const prompt = "Write a story about an AI and magic";

//     const result = await model.generateContent(prompt);
//     const response = await result.response;
//     const text = await response.text();
//     console.log(text);
//   }

//   chrome.storage.local.get(["pageContentArr"], (result) => {
//     const contentDiv = document.getElementById("content");

//     if (result.pageContentArr) {
//       // Access your API key as an environment variable (see "Set up your API key" above)
//       const genAI = new GoogleGenerativeAI(
//         "AIzaSyBS9Tu_7svWg9hejPf3RcFQu79r5YqngYE"
//       );

//       const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
//       run();
//     } else {
//       contentDiv.textContent = result.pageContentArr;
//     }
//   });
// });
