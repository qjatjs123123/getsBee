import "./Header.css";

function Header() {
  return (
    <>
      <div className="header-container">
        <img className="getsbee-icon" src="/icon.png" />
        <div className="header-inner">
          <div className="text">getsBee</div>
          <img className="profile" src="/profile.jpg"></img>
        </div>
      </div>
    </>
  );
}

export default Header;
