import { Link } from 'react-router-dom';
import logoIcon from '../../assets/logoIcon.png';
import MainSearchBar from './MainSearchBar';
import Menu from './Menu';

function Header() {
  return (
    <div className="flex items-center justify-between">
      <Link to="/" className="flex items-center font-bold">
        <img className="w-[160px] ml-[20px] mt-[24px] mb-[24px]" src={logoIcon} alt="beeIcon" />
      </Link>
      <MainSearchBar />
      <Menu />
    </div>
  );
}

export default Header;
