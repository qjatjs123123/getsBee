import React from "react";
import "./Item.css";

const Item = React.memo(({ content, color }) => {
  return (
    <div className="item-container">
      <div className="item-bar" style={{ backgroundColor: color }}></div>
      <div className="item-txt">{content}</div>
    </div>
  );
});

export default Item;
