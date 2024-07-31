/* eslint-disable no-undef */
import "./Content.css";
import React, { useState, useEffect, useRef } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import Spinner from "./Spinner"; // 스피너 컴포넌트 import
import Item from "./Item";

function Content() {
  const [content, setContent] = useState(false);
  const [result, setResult] = useState([]);
  const [loading, setLoading] = useState(true); // 로딩 상태
  const apiKey = process.env.REACT_APP_API_KEY;
  const contentRef = useRef(null);

  // eslint-disable-next-line no-undef
  // 페이지 로드 시 chrome.storage에서 데이터 가져오기
  // eslint-disable-next-line no-undef
  async function run(model) {
    let prompt =
      "이 배열에서 해당 중요한 문장을 추천해줘, 응답해줄 때  인덱스로 이루어진 배열만을 보내고 나머지는 절대 보내지마 그리고 0개부터 최대 5개 까지 보내, array format으로 응답해줘, 예를들어서 [0, 1, 2] ";
    prompt += JSON.stringify(content);
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = await response.text();
    setResult(JSON.parse(text));
    setLoading(false);
  }

  const recommend = async () => {
    setLoading(true);
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    await run(model);
  };
  useEffect(() => {
    // 클라이언트 사이드에서만 실행
    chrome.storage.local.get(["pageContentArr"], async (result) => {
      if (result.pageContentArr) {
        // Access your API key as an environment variable (see "Set up your API key" above)
        setContent(result.pageContentArr);
      } else {
        contentRef.current.textContent = result.pageContentArr;
      }
    });
  }, []);

  return (
    <>
      <div className="content-container" ref={contentRef}>
        <div class="loading-spinner loading-spinner--js"></div>
        {result.length === 0 ? (
          <div className="buttonDiv">
            <span>해당 페이지의 핵심 문장을 GPT 추천 받아보세요.</span>
            <div className="button" onClick={recommend}>
              원클릭 핵심 문장 추천
            </div>
          </div>
        ) : loading ? (
          <Spinner /> // 로딩 중에는 스피너 표시
        ) : (
          result.map((idx, index) => (
            <Item key={index} content={content[index]} />
          ))
        )}
      </div>
    </>
  );
}

export default Content;
