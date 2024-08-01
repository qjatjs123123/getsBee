/* eslint-disable no-undef */
import "./Content.css";
import React, { useState, useEffect, useRef } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import Spinner from "./Spinner"; // 스피너 컴포넌트 import
import Item from "./Item";

function Content() {
  const [content, setContent] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
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
      const tmp = result.resultArr;

      if (tmp.length !== 0) {
        setResult(tmp);
      }
    });
  }, []);

  // GPT-3 모델 실행 함수
  async function run(model) {
    try {
      let prompt = `
      다음 문장 배열에서 중요하다고 생각되는 문장들의 인덱스를 추천해 주세요. 다음 조건을 만족해야 합니다:
      1. 결과는 인덱스 번호로만 이루어진 배열 형태로 제공되어야 하며, 본문 내용은 포함하지 마세요.
      2. 최대 8개의 인덱스를 포함해야 합니다.
      3. 응답은 문자열 형식이어야 하며, 배열의 형태로 문자열로 변환하여 제공해 주세요. 예를 들어, [0, 1, 2] 형식으로 응답해 주세요.
      4. 선택된 인덱스는 본문 내용과 관련이 있어야 합니다.
      
      본문 배열 예시:
      [1: "문장 A", 2: "문장 B", 3: "문장 C", 4: "문장 D", "문장 E"]
      
      중요한 문장들의 인덱스가 1, 3, 2번이라면, 응답은 다음과 같아야 합니다:
      [1, 3, 2]
      `;
      // 객체를 생성하기 위해 reduce 사용
      if (content.length === 0) {
        setLoading(false);
        setErrorMessage("본문에 내용이 부족합니다.");
        setError(true);
        return;
      }

      const result1 = content.reduce((acc, item, index) => {
        acc[index] = item;
        return acc;
      }, {});
      prompt += JSON.stringify(result1);

      const result = await model.generateContent(prompt);
      const response = await result.response;
      const text = await response.text();
      let jsonData = "";
      try {
        jsonData = text.split("```")[1].split("json")[1];
      } catch (er) {
        jsonData = text;
      }
      setResult(JSON.parse(jsonData));
      chrome.runtime.sendMessage({
        type: "RECOMMEND_CLICKED",
        resultArr: JSON.parse(jsonData),
        contentArr: content,
      });
    } catch (error) {
      setErrorMessage("본문이 너무 깁니다.");
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
          <div className="error-message">{errorMessage}</div>
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
    console.log(result[0], content);
    return result.map((idx) => <Item key={idx} content={content[idx]} />);
  };

  return (
    <div className="content-container" ref={contentRef}>
      {renderContent()}
    </div>
  );
}

export default Content;
