import "./Item.css";

function Item({ content }) {
  return (
    <>
      <div className="item-container">
        <div className="item-bar"></div>
        <div className="item-txt">{content}</div>
      </div>
    </>
  );
}

export default Item;
