/* eslint-disable no-undef */
import "./Header.css";
import React, { useState, useEffect, useRef } from "react";

function Header() {
  const [img, setImg] = useState("");
  const [login, setLogin] = useState(false);
  const email = useRef("");
  const handleNavigation = () => {
    if (!login) window.open("https://getsbee.kr/about", "_blank");
    else window.open("https://getsbee.kr/myhive/" + email.current, "_blank");
  };

  useEffect(() => {
    chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
      if (message.type === "SEND_DATA" && message.data.userState.picture) {
        if (message.data.userState.email) {
          setImg(message.data.userState.picture);
          setLogin(true);
          email.current = message.data.userState.email.split("@")[0];
        } else {
          setLogin(false);
        }
      } else {
        setImg(null);
      }
    });
  }, []);

  return (
    <>
      <div className="header-container">
        <div className="header-inner">
          <img
            onClick={handleNavigation}
            className="getsbee-icon"
            src="/logoIcon.png"
            style={{ cursor: "pointer" }}
          />
          <img
            onClick={handleNavigation}
            className="profile"
            src={img ? img : "/userIcon.png"}
            alt="Profile"
            style={{
              cursor: "pointer",
              borderRadius: img ? "50%" : "0%", // img가 있을 때는 border-radius 50%, 없으면 0%
            }}
          />
        </div>
      </div>
    </>
  );
}

export default Header;
