/* eslint-disable no-undef */
import "./Content.css";
import React, { useState, useEffect, useRef } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import Spinner from "./Spinner"; // 스피너 컴포넌트 import
import Item from "./Item";

function Content() {
  const [content, setContent] = useState(false);
  const [result, setResult] = useState([]);
  const [loading, setLoading] = useState(false); // 로딩 상태 초기값을 false로 설정
  const [error, setError] = useState(false);
  const apiKey = process.env.REACT_APP_API_KEY;
  const contentRef = useRef(null);

  // 페이지 로드 시 chrome.storage에서 데이터 가져오기
  useEffect(() => {
    chrome.storage.local.get(["pageContentArr"], (result) => {
      if (result.pageContentArr) {
        setContent(result.pageContentArr);
      }
    });
    chrome.storage.local.get(["resultArr"], (result) => {
      if (result.resultArr.length !== 0) {
        setResult(result.resultArr);
      }
    });
  }, []);

  // GPT-3 모델 실행 함수
  async function run(model) {
    try {
      let prompt =
        "이 배열에서 해당 중요한 문장을 추천해줘, 응답해줄 때 인덱스로 이루어진 배열만을 보내고 나머지는 절대 보내지마 그리고 반드시 최대 8개까지 보내 또한 본문과 관련된 내용을 추천해주어야 됨, array를 문자열로 변환해서 응답해줘, 예를 들어서 [0, 1, 2]를 문자열로 응답해줘";
      prompt += JSON.stringify(content);
      const result = await model.generateContent(prompt);
      const response = await result.response;
      const text = await response.text();
      setResult(JSON.parse(text));

      chrome.storage.local.set({ resultArr: JSON.parse(text) }, () => {});
    } catch (error) {
      setError(true);
    }
    setLoading(false); // 응답을 받은 후 로딩 상태를 false로 설정
  }

  // 추천 버튼 클릭 시 실행되는 함수
  const recommend = async () => {
    setError(false); // 추천 요청 시작 시 에러 상태를 false로 초기화
    setLoading(true); // 추천 요청 시작 시 로딩 상태를 true로 설정
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    await run(model);
  };

  // 상태에 따른 렌더링을 처리하는 함수
  const renderContent = () => {
    if (loading) {
      return <Spinner />; // 로딩 상태일 때만 Spinner 컴포넌트를 표시
    }

    if (error) {
      return (
        <div className="error-container">
          <div className="error-message">에러가 발생했습니다.</div>
        </div>
      );
    }

    if (result.length === 0) {
      return (
        <div className="buttonDiv">
          <span>해당 페이지의 핵심 문장을 GPT 추천 받아보세요.</span>
          <div className="button" onClick={recommend}>
            원클릭 핵심 문장 추천
          </div>
        </div>
      );
    }

    return result.map((idx) => (
      <Item key={idx} content={content[Number(idx)]} />
    ));
  };

  return (
    <div className="content-container" ref={contentRef}>
      {renderContent()}
    </div>
  );
}

export default Content;
