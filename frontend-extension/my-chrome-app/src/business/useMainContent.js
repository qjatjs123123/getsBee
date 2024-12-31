import { useState, useEffect } from 'react';
const { Readability } = require("@mozilla/readability");

function useMainContent(HTMLContent) {
  const [mainContentArr, setmainContentArr] = useState([]);
  const [mainContentStr, setmainContentStr] = useState("");

  const sentencePattern = /(?<=[.!?])\s+/g;

  const htmlStringToDocument = (htmlString) => {
    const parser = new DOMParser();
    return parser.parseFromString(htmlString, "text/html");
  }

  const createEmptyResult = () => ({ text: "", node: "" });

  const extractMainContent = async (HTMLContent) => {
    try {
      const document = htmlStringToDocument(HTMLContent);
      const reader = new Readability(document);
      const article = reader.parse();
  
      if (!article) return createEmptyResult();
  
      return {
        text: article.textContent,
        node: htmlStringToDocument(article.content).body,
      };
    } catch (error) {
      return createEmptyResult();
    }
  }

  const isInvalidTag = (tagName) => {
    const targetTags = new Set(["p", "span", "div", "li", "article", "img"]);
    return !targetTags.has(tagName.toLowerCase());
  };

  const isInvalidTextContent = (textContent) => {
    return !(textContent && textContent.length > 20 && textContent.length <= 200);
  };

  const splitSentences = (textContent, sentencePattern) => {
    return textContent
      .split(sentencePattern)
      .map((sentence) => sentence.trim())
      .filter((sentence) => sentence.length > 0);
  };

  function extractTextNodes(node) {
    const tmp = [];
    let str = "";
    function traverse(currentNode) {
      if (currentNode.nodeType === Node.TEXT_NODE) {
        const parentElement = currentNode.parentNode;       
        const textContent = currentNode.textContent.trim();
        const tagName = parentElement.tagName.toLowerCase();

        if (isInvalidTag(tagName) || isInvalidTextContent(textContent)) return;

        const sentences = splitSentences(textContent, sentencePattern);

        sentences.forEach((sentence) => {
          str += sentence;
          tmp.push(sentence);
        });
        
      }
      if (currentNode.nodeType === Node.ELEMENT_NODE) {
        Array.from(currentNode.childNodes).forEach((child) => traverse(child));
      }
    }

    traverse(node);
    setmainContentStr(str);
    setmainContentArr(tmp);
  }

  useEffect(() => {
    extractMainContent(HTMLContent)
      .then((result) => {
        extractTextNodes(result.node);
      })
      .catch((err) => {console.log(err)});
  }, [HTMLContent]);

  return { mainContentArr, mainContentStr };
}

export default useMainContent;