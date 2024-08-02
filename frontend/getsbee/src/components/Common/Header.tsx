import { Link } from 'react-router-dom';
import logoIcon from '../../assets/logoIcon.png';
import MainSearchBar from './MainSearchBar';
import Menu from './Menu';

function Header() {
  return (
    <div className="flex justify-between ">
      <Link to="/home" className="flex items-center ml-[20px] mt-[24px] font-bold">
        <img className="w-[160px] h-[32px] mr-[12px]" src={logoIcon} alt="beeIcon" />
      </Link>
      <MainSearchBar />
      <Menu />
    </div>
  );
}

export default Header;
