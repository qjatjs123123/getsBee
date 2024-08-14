import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { Button } from 'primereact/button';
import { Avatar } from 'primereact/avatar';
import { TieredMenu } from 'primereact/tieredmenu';
import { userState } from '../../recoil/userState';
import { logoutAPI, clearAuthData } from '../../api/AuthAPI';
import myHiveIcon from '../../assets/myHiveIcon.png';
import aboutIcon from '../../assets/aboutIcon.png';
import logoutIcon from '../../assets/logoutIcon.png';
import userIcon from '../../assets/userIcon.png';
import homeIcon from '../../assets/homeIcon.png';

const PopupMenu: React.FC = () => {
  const [user, setUser] = useRecoilState(userState);
  const navigate = useNavigate();
  const menu = useRef<TieredMenu>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await logoutAPI();
      performLogout();
    } catch (error) {
      console.error('Logout failed:', error);
      performLogout();
    }
  };

  const performLogout = () => {
    clearAuthData();
    setUser(null);
    navigate('/about');
  };

  const items = [
    {
      label: 'Home',
      icon: <img src={homeIcon} alt="Home" className="w-7 mr-3" />,
      className: 'text-base font-bold',
      command: () => navigate('/'),
    },
    {
      label: 'MyHive',
      icon: <img src={myHiveIcon} alt="MyHive" className="w-7 mr-3" />,
      className: 'text-base font-bold',
      command: () => navigate('/myHive'),
    },
    {
      label: 'About',
      icon: <img src={aboutIcon} alt="About" className="w-7 mr-3" />,
      className: 'text-base font-bold',
      command: () => navigate('/about'),
    },
    {
      label: 'Logout',
      icon: <img src={logoutIcon} alt="Logout" className="w-7 mr-3" />,
      className: 'text-base font-bold',
      command: handleLogout,
    },
  ];

  if (!user) {
    return null;
  }

  const handleToggle = (event: React.MouseEvent<HTMLButtonElement>) => {
    setIsMenuOpen(!isMenuOpen);
    menu.current?.toggle(event);
  };

  return (
    <div className="card flex justify-content-center">
      <TieredMenu
        model={items}
        popup
        ref={menu}
        breakpoint="767px"
        className="custom-tieredmenu w-36 p-0"
        onShow={() => setIsMenuOpen(true)}
        onHide={() => setIsMenuOpen(false)}
      />
      <Button
        onClick={handleToggle}
        rounded
        text
        severity="secondary"
        aria-label="Bookmark"
        className="p-2 focus:outline-none focus:shadow-none ml-auto"
      >
        <Avatar image={user.picture || userIcon} size="large" shape="circle" className="w-8 h-8 mr-2" />
        <i
          className={`pi ${isMenuOpen ? 'pi-angle-up' : 'pi-angle-down'} text-[#8D8D8D]`}
          style={{ fontSize: '1rem' }}
        />
      </Button>
    </div>
  );
};

export default PopupMenu;
