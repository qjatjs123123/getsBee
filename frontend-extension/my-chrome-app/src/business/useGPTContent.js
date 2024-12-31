import React, { useState, useEffect, useRef } from "react";
import Groq from "groq-sdk";

const groq = new Groq({ apiKey: process.env.REACT_APP_API_KEY,
  dangerouslyAllowBrowser: true, 
 });

function useGPTContent() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState(false);
  const apiKey = process.env.REACT_APP_API_KEY;  

  const getGroqChatCompletion = async (prompt) => {
    return groq.chat.completions.create({
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
      model: "llama3-8b-8192",
    });
  };
  
  const run = async (prompt) => {
    const chatCompletion = await getGroqChatCompletion(prompt);
    const text = chatCompletion.choices[0]?.message?.content || "";
    return text;
  };

  return {
    run,
    loading,
    error,
    errorMessage,
    setLoading,
    setError,
    setErrorMessage
  }
}

export default useGPTContent;
