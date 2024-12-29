/* eslint-disable no-undef */
import "./App.css";
import Content from "./Content";
import Header from "./Header";
import Footer from "./Footer";
import React, { useState, useEffect, useRef, useReducer } from "react";

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
  const [HTMLContent, setHTMLContent] = useState("");
  const [domain, setDomain] = useState("");
  const [isEnabled, setIsEnabled] = useState(false);

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

    chrome.storage.local.get(["domain", "resultArr", "HTMLContent"], (result) => {
      setDomain(result.domain);
      setHTMLContent(result.HTMLContent)
    });
  }, []);


  useEffect(() => {
    chrome.storage.sync.get([domain], (result) => {
      setIsEnabled(result[domain] || false);
    });
  }, [domain]);
  
;
  return (
    <>
      <div className="App">
        <Header isLogin={loginstate.islogin} userState={loginstate.userState}/>
        <Content isLogin={loginstate.islogin} isEnabled={isEnabled} HTMLContent={HTMLContent}/>
        <Footer
          domain={domain}
          isEnabled={isEnabled}
          setIsEnabled={setIsEnabled}
        />
      </div>
    </>
  );
}

export default App;
