/* eslint-disable no-undef */
import "./App.css";
import Content from "./Content";
import Header from "./Header";
import Footer from "./Footer";
import React, { useState, useEffect, useRef } from "react";

function App() {
  const [domain, setDomain] = useState("");
  const [isEnabled, setIsEnabled] = useState(false);

  useEffect(() => {
    // 페이지 로드 시 chrome.storage에서 데이터 가져오기
    // eslint-disable-next-line no-undef
    chrome.runtime.onMessage.addListener((message) => {
      if (message.data.hostName) {
        setDomain(message.data.hostName);
      }
    });
  }, []);
  useEffect(() => {
    // Load the saved switch state from chrome.storage
    // eslint-disable-next-line no-undef
    chrome.storage.sync.get([domain], (result) => {
      setIsEnabled(result[domain] || false);
    });
  }, [domain]);

  useEffect(() => {
    chrome.runtime.sendMessage({
      type: "ENABLE_DATA",
      isEnabled: isEnabled,
    });
  }, [isEnabled]);
  return (
    <>
      <div className="App">
        <Header />
        <Content domain={domain} isEnabled={isEnabled} />
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
