/* eslint-disable no-undef */
import "./Footer.css";
import React, { useState, useEffect } from "react";

function Footer({ domain, isEnabled, setIsEnabled }) {
  const handleToggle = () => {
    const newState = !isEnabled;
    setIsEnabled(newState);
    chrome.storage.sync.set({ [domain]: newState });
  };
  return (
    <>
      <div className="footer-container">
        <div>
          Enable on <span className="textdomain">{domain}</span>
        </div>
        <div>
          <label>
            <input
              role="switch"
              type="checkbox"
              checked={!isEnabled}
              onChange={handleToggle}
            />
          </label>
        </div>
      </div>
    </>
  );
}

export default Footer;
