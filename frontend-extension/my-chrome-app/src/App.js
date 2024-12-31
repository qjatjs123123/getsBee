/* eslint-disable no-undef */
import "./App.css";
import Container from "./components/Container";
import Header from "./Header";
import Footer from "./Footer";
import React, { useState, useEffect, useRef, useReducer } from "react";
import { useRecoilValue } from 'recoil';
import { domainState } from "./recoil/domainState"
import { enableState } from "./recoil/enableState";
import Disable from "./components/Disable";
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
  const enable = useRecoilValue(enableState);

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
  }, []);



  return (
    <>
      <div className="App">
        <Header isLogin={loginstate.islogin} userState={loginstate.userState}/>
          {
            !enable && loginstate.islogin ? <Container/>:<Disable />
          }
        <Footer/>
      </div>
    </>
  );
}

export default App;
