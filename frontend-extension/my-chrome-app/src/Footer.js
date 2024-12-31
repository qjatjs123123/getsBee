/* eslint-disable no-undef */
import "./Footer.css";
import React, { useState, useEffect } from "react";
import { useRecoilValue } from 'recoil';
import { useRecoilState } from 'recoil';
import { domainState } from "./recoil/domainState"
import { enableState } from "./recoil/enableState";

function Footer() {
  const domain = useRecoilValue(domainState);
  const [enable, setEnable] = useRecoilState(enableState);

  useEffect(() => {
    chrome.storage.sync.get([domain], (result) => {
      setEnable(result[domain] || false);
    });

  }, [domain]);

  const handleToggle = () => {
    const newState = !enable;
    setEnable(newState);

    chrome.storage.sync.set({ [domain]: newState }, () => {
      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        const tab = tabs[0];
        chrome.tabs.sendMessage(
            tab.id, {
                type: 'ENABLE_DATA',
                isEnabled: newState
            },
            (response) => {
                console.log(response);
            }
        );
      });
    });
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
              checked={!enable}
              onChange={handleToggle}
            />
          </label>
        </div>
      </div>
    </>
  );
}

export default Footer;
