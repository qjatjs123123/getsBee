import React, { useState, useEffect, useRef } from "react";
import Spinner from "../Spinner"; 
import useMainContent from "../business/useMainContent";
import useGPTContent from "../business/useGPTContent";
import Error from "./Error";
import { useRecoilState } from 'recoil';
import { summaryState } from "../recoil/summaryState";


function Summary({ HTMLContent }) {
  const { mainContentArr } = useMainContent(HTMLContent);
  const { 
    run, 
    loading,
    error,
    errorMessage,
    setLoading,
    setError,
    setErrorMessage } = useGPTContent();
  const [result, setResult] = useState([]);
  const [summary, setSummary] = useRecoilState(summaryState);

  const createPrompt = () => {
    let prompt = `
      다음 문장을 요약해서 간단하게 알려주세요
      너의 쓸데없는 문구 제외하고 요약한 글만 전달해서 주세요.
      무조건 한국어로 답해주세요
    `;

    const result = mainContentArr.reduce((acc, item) => {
      return acc + item; 
    }, "");
    prompt += JSON.stringify(result);

    return prompt;
  }

  const getAPIResult = async () => {
    try{
      const prompt = createPrompt();
      const responseData = await run(prompt);

      setSummary(responseData);
      setLoading(false);

    } catch( error ) {
      setError(true);
      setErrorMessage("오류가 발생하였습니다.")
    }
    
  }

  useEffect(() => {    
    if (mainContentArr.length === 0) return;
    if (summary) return;
    getAPIResult();
  }, [mainContentArr])

  const renderContent = () => {
    if (!summary) return <Spinner />; 
    if (error) return <Error />
    
    return <p style={{  lineHeight: '1.5' }}>{summary}</p>
  }

  return (
    <>
    {renderContent()}
    </>
  ) 
}

export default React.memo(Summary);