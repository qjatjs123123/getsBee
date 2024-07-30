import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { Button } from 'primereact/button';
import { Avatar } from 'primereact/avatar';
import { TieredMenu } from 'primereact/tieredmenu';
import { userState } from '../../recoil/userState';
import myHiveIcon from '../../assets/myHiveIcon.png';
import aboutIcon from '../../assets/aboutIcon.png';
import logoutIcon from '../../assets/logoutIcon.png';
import userIcon from '../../assets/userIcon.png';

const PopupMenu: React.FC = () => {
  const [user, setUser] = useRecoilState(userState);
  const navigate = useNavigate();
  const menu = useRef<TieredMenu>(null);

  const handleLogout = () => {
    // 로그아웃 로직
    setUser(null);
    navigate('/');
  };

  const items = [
    {
      label: 'MyHive',
      icon: <img src={myHiveIcon} alt="MyHive" className="w-7 h-7 mr-3" />,
      className: 'text-base font-bold',
      command: () => navigate('/myHive'),
    },
    {
      label: 'About',
      icon: <img src={aboutIcon} alt="About" className="w-7 h-7 mr-3" />,
      className: 'text-base font-bold',
      command: () => navigate('/about'),
    },
    {
      label: 'Logout',
      icon: <img src={logoutIcon} alt="Logout" className="w-7 h-7 mr-3" />,
      className: 'text-base font-bold',
      command: handleLogout,
    },
  ];

  if (!user) {
    return null;
  }

  const handleToggle = (event: React.MouseEvent<HTMLButtonElement>) => {
    menu.current?.toggle(event);
  };

  return (
    <div className="card flex justify-content-center">
      <TieredMenu model={items} popup ref={menu} breakpoint="767px" className="w-36 p-0" />
      <Button
        onClick={handleToggle}
        rounded
        text
        severity="secondary"
        aria-label="Bookmark"
        className="p-2 focus:outline-none focus:shadow-none m-0 p-0"
      >
        <Avatar image={user.picture || userIcon} size="large" shape="circle" className="w-12 h-12" />
      </Button>
    </div>
  );
};

export default PopupMenu;
