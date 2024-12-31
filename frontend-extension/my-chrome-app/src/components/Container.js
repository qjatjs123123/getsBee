/* eslint-disable no-undef */
import Tab from "../Tab";
import Content from "./Content";
import Home from "./Home";
import "./Container.css"
import { useEffect, useState, useCallback, useMemo } from "react";
import { tabItems } from "../util/constant";
import Summary from "./Summary";
import React from "react";

function Container({isEnabled}) {
  const [domain, setDomain] = useState(null);
  const [HTMLContent, setHTMLContent] = useState(null);
  const [highlightArr, setHighlightArr] = useState({});
  const [recommendArr, setRecommendArr] = useState([]);
  const [summaryContent, setSummaryContent] = useState("");
  const [tab, setTab] = useState('home');


  useEffect(() => {
    chrome.storage.local.get(["domain", "recommendArr", "HTMLContent", "highlightArr", "summaryContent"], (result) => {
      setDomain(result.domain);
      setHTMLContent(result.HTMLContent);
      setHighlightArr(result.highlightArr);
      setRecommendArr(result.recommendArr);
      setSummaryContent(result.summaryContent);
    });
  }, []);

  useEffect(() => {
    const saveData  = {
      domain,
      HTMLContent: HTMLContent,
      recommendArr,
      highlightArr,
      summaryContent
    }
    chrome.storage.local.set(saveData, () => {});
  }, [recommendArr, summaryContent])

  
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
