import "./Footer.css";
import React, { useState, useEffect } from "react";

function Footer() {
  const [domain, setDomain] = useState("");

  useEffect(() => {
    // 클라이언트 사이드에서만 실행

    // eslint-disable-next-line no-undef
    // 페이지 로드 시 chrome.storage에서 데이터 가져오기
    // eslint-disable-next-line no-undef
    chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
      if (message.data.hostName) {
        setDomain(message.data.hostName);
      }
    });

  }, []);
  return (
    <>
      <div className="footer-container">
        <div>
          Enable on <span className="textdomain">{domain}</span>
        </div>
        <div>
          <label>
            <input role="switch" type="checkbox" />
          </label>
        </div>
      </div>
    </>
  );
}

export default Footer;
