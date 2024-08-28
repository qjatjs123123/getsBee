import { Link } from 'react-router-dom';
import logoIcon from '../../assets/logoIcon.png';
import Menu from './Menu';

const AboutHeader = () => {
  return (
    <div className="flex items-center justify-between mb-4">
      <Link to="/" className="flex items-center font-bold">
        <img className="w-[140px] ml-[20px] mt-[24px] mb-[24px]" src={logoIcon} alt="beeIcon" />
      </Link>
      {/* <MainSearchBar /> */}
      <div className="w-[140px] flex justify-end mr-[20px]">
        <Menu />
      </div>
    </div>
  );
};

export default AboutHeader;
