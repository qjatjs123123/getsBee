import React from "react";
import Item from "../Item";

const Home = ({ highlightArr }) => {

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
