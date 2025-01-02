/* eslint-disable no-undef */
import "./Content.css";
import React, { useState, useEffect, useRef } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import Spinner from "../Spinner"; // 스피너 컴포넌트 import
import Item from "../Item";
import Groq from "groq-sdk";
import useMainContent from "../business/useMainContent";
import useGPTContent from "../business/useGPTContent";
import Error from "./Error";
import { useRecoilState } from 'recoil';
import { recommendState } from "../recoil/recommendState";

const groq = new Groq({ apiKey: process.env.REACT_APP_API_KEY,
  dangerouslyAllowBrowser: true, 
 });

function Content({ HTMLContent }) {
  const { mainContentArr } = useMainContent(HTMLContent);
  const { 
    run, 
    loading,
    error,
    setError,
    setErrorMessage } = useGPTContent();

  const [recommendations, setRecommendations] = useRecoilState(recommendState);

  const regex = /(\{[^}]+\})/g;

  const getAPIResult = async () => {
    try{
      const prompt = createPrompt();
      const responseData = await run(prompt);

      const result = parseData(responseData);

      setRecommendations(result);
    } catch( error ) {
      setError(true);
      setErrorMessage("오류가 발생하였습니다.")
    }
    
  }

  useEffect(() => {
    
    if (mainContentArr.length === 0) return;
    if (recommendations) return;
    getAPIResult();
  }, [mainContentArr])



  const createPrompt = () => {
    let prompt = `
      다음 문장 배열에서 중요하다고 생각되는 문장들을 배열형식으로 추천해 주세요. 다음 조건을 만족해야 합니다:
      1  그리고 꼭 배열의 크기가 5를 넘으면 안됩니다.
      2. JSON형식으로 보내주세요 예를 들어, [{"중요 문장1의 인덱스" : "중요 문장1"}, {"중요 문장2의 인덱스" : "중요 문장2"}, {"중요 문장3의 인덱스" : "중요 문장3"}] 형식으로 응답해 주세요.
      3. 전체적인 내용을 빠르게 파악할 수 있는 핵심 문장들을 추천해주세요, 기존 배열에서 순서에 맞게 제공해주어야 합니다. 
      4. 또한 기존 문장에서 문장을 추가하지말고 그냥 있는 그대로 중요 문장을 추출해주세요.
      
      예를 들어 [{0 : 중요문장1}, {5: 중요문장2}, {10: 중요문장3}, {13: 중요문장4}, {15: 중요문장5}] 이런 템플릿입니다.
      그리고 절대 문장 데이터를 변경해서는 안됩니다.
      전달받은 문장을 그대로 주세요
      `;

    const result = mainContentArr.reduce((acc, item, index) => {
        acc[index] = item;
        return acc;
    }, {});
    prompt += JSON.stringify(result);
    prompt += " \n\n\n 어떠한 문구 없이 JSON형식 답만 줘 ";

    return prompt;
  }

  const parseData = (apiResultData) => {
    let match;
    const sentences = [];

    while ((match = regex.exec(apiResultData)) !== null) {
      sentences.push(JSON.parse(match[1])); 
    }

    const sortedValues = sentences
      .sort((a, b) => Object.keys(a)[0] - Object.keys(b)[0])  
      .map(item => Object.values(item)[0]); 

    return sortedValues;
  }

  const renderContent = () => {

    if (!recommendations) return <Spinner />; 
    if (error) return <Error />
    
    return recommendations.map((idx) => <Item key={idx} content={idx} color={"rgb(235, 235, 235)"} />); 
  }

  return (
    <div className="content-container" >
      {renderContent()}
    </div>
  );
}

export default React.memo(Content);
