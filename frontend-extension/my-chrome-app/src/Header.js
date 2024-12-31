/* eslint-disable no-undef */
import "./Header.css";
import React from "react";

function Header({isLogin, userState}) {
  const handleNavigation = () => {
    if (!isLogin) window.open("https://getsbee.kr/about", "_blank");
    else window.open("https://getsbee.kr/myhive/" + userState.email.split("@")[0], "_blank");
  };

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
            src={isLogin ? userState.picture : "/userIcon.png"}
            alt="Profile"
            style={{
              cursor: "pointer",
              borderRadius: isLogin ? "50%" : "0%", // img가 있을 때는 border-radius 50%, 없으면 0%
            }}
          />
        </div>
      </div>
    </>
  );
}

export default Header;
