import searchIcon from '../../assets/searchIcon.png';
import './MainSearchBar.css';

const MainSearchBar = () => {
  return (
    <div className="mainSearchBar">
      <input className="searchBox" placeholder="search" />
      <img className="searchIcon" src={searchIcon} alt="searchIcon" />
    </div>
  );
};

export default MainSearchBar;
