import React from "react";
import Item from "../Item";

const Home = ({ highlightArr }) => {
  if (Object.keys(highlightArr).length === 0) {
    return <div style={{ padding: '20px', textAlign: 'center', color: '#ff6347', backgroundColor: '#f0f0f0', borderRadius: '8px', fontSize: '16px', fontWeight: 'bold' }}>하이라이트 문구가 없습니다.</div>;
  }
  
  return (
    <>
        {Object.keys(highlightArr).map((key) => {
          const item = highlightArr[key]; 
          return (
            <Item key={item.id} color={item.color} content={item.content}/>
          );
        })}

    </>
  );
};

export default Home;
