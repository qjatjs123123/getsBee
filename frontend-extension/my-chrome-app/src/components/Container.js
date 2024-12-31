/* eslint-disable no-undef */
import Tab from "../Tab";
import Content from "./Content";
import Home from "./Home";
import "./Container.css"
import { useEffect, useState, useCallback, useMemo } from "react";
import { tabItems } from "../util/constant";
import Summary from "./Summary";
import React from "react";
import { useRecoilState } from 'recoil';
import { domainState } from "../recoil/domainState";


function Container({isEnabled}) {
  const [HTMLContent, setHTMLContent] = useState(null);
  const [highlightArr, setHighlightArr] = useState({});
  const [tab, setTab] = useState('home');
  const [domain, setDomain] = useRecoilState(domainState);

  useEffect(() => {
    chrome.storage.local.get(["domain", "recommendArr", "HTMLContent", "highlightArr", "summaryContent"], (result) => {
      setDomain(result.domain);
      setHTMLContent(result.HTMLContent);
      setHighlightArr(result.highlightArr);
    });
  }, []);
  
  const memoizedSetTab = useCallback((newTab) => {setTab(newTab)}, []);
  const memoizedHighlightArr = useMemo(() => highlightArr, [highlightArr]);



  function TabRenderer() {
    switch (tab) {
      case 'home':
        return <Home highlightArr={memoizedHighlightArr}/>;
      case 'recommend':
        return <Content HTMLContent={HTMLContent}/>;
      case 'summary':
        return <Summary HTMLContent={HTMLContent} />;
      default:
        return <div></div>;
    }
  }


  return (
    <>
      <Tab setTab={memoizedSetTab} tab={tab}/>
      <div className="container">
        {TabRenderer()}
      </div>
      </>
  );
}

export default React.memo(Container);
