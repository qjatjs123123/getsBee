/* eslint-disable no-undef */
import "./Header.css";
import React, { useState } from "react";

function Header() {
  const [img, setImg] = useState("");

  chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.type === "SEND_DATA") {
      console.log(message);
      setImg(message.data.userState.picture);
    }
  });

  return (
    <>
      <div className="header-container">
        <img className="getsbee-icon" src="/icon.png" />
        <div className="header-inner">
          <div className="text">getsBee</div>
          <img className="profile" src={img}></img>
        </div>
      </div>
    </>
  );
}

export default Header;
