/* eslint-disable no-undef */
import "./App.css";
import Container from "./components/Container";
import Header from "./Header";
import Footer from "./Footer";
import React, { useState, useEffect, useRef, useReducer } from "react";
import { RecoilRoot } from 'recoil';

const initloginState = {
  islogin: false,
  accessToken: null,
  userState: null,
};

function loginReducer(loginState, action) {
  switch (action.type) {
    case "login" : 
      return {
        ...loginState,
        islogin: true,
        accessToken: action.payload.accessToken,
        userState: action.payload.userState
      }
    case "logout" :
      return {
        ...loginState,
        islogin: false,
        accessToken: null,
        userState: null
      }
    default:
      break;
  }
}

function App() {
  const [loginstate, loginDispatch] = useReducer(loginReducer, initloginState);
  const [domain, setDomain] = useState("");
  const [isEnabled, setIsEnabled] = useState(false);
  const [HTMLContent, setHTMLContent] = useState(null);
  const [highlightArr, setHighlightArr] = useState({});

  console.log(HTMLContent)
  useEffect(() => {
    chrome.storage.sync.get(["GETSBEE_LOGIN"], (result) => {
      if (result.GETSBEE_LOGIN) {
        loginDispatch({
          type: "login",
          payload: result.GETSBEE_LOGIN,
        });
      } else {
        loginDispatch({
          type: "logout",
          payload: result.GETSBEE_LOGIN,
        });
      }
    });

    chrome.storage.local.get(["domain", "recommendArr", "HTMLContent", "highlightArr", "summaryContent"], (result) => {
      setDomain(result.domain);
      setHTMLContent(result.HTMLContent)
      setHighlightArr(result.recommendArr)
      if (HTMLContent !== result.HTMLContent) {
        setHTMLContent(result.HTMLContent);
      }
    });
  }, []);


  useEffect(() => {
    chrome.storage.sync.get(["domain"], (result) => {
      setIsEnabled(result[domain] || false);
    });
  }, [domain]);
  
;
  return (
    <>
      <div className="App">
        <RecoilRoot>
          <Header isLogin={loginstate.islogin} userState={loginstate.userState}/>
          <Container highlightArr={highlightArr} isEnabled={isEnabled} HTMLContent={HTMLContent}/>
          <Footer
            domain={domain}
            isEnabled={isEnabled}
            setIsEnabled={setIsEnabled}
          />
        </RecoilRoot>
      </div>
    </>
  );
}

export default App;
