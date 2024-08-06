import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { Button } from 'primereact/button';
import { Avatar } from 'primereact/avatar';
import { TieredMenu } from 'primereact/tieredmenu';
import { userState } from '../../recoil/userState';
import axios from '../../api/axiosConfig';
import myHiveIcon from '../../assets/myHiveIcon.png';
import aboutIcon from '../../assets/aboutIcon.png';
import logoutIcon from '../../assets/logoutIcon.png';
import userIcon from '../../assets/userIcon.png';

const PopupMenu: React.FC = () => {
  const [user, setUser] = useRecoilState(userState);
  const navigate = useNavigate();
  const menu = useRef<TieredMenu>(null);

  const handleLogout = async () => {
    try {
      const accessToken = localStorage.getItem('accessToken');
      const refreshToken = localStorage.getItem('refreshToken');

      if (!accessToken || !refreshToken) {
        console.error('Tokens not found in local storage');
        // 토큰이 없어도 로그아웃 처리를 진행합니다.
        performLogout();
        return;
      }

      // 서버에 로그아웃 요청 보내기
      await axios.post('/auth/logout', {
        accessToken,
        refreshToken,
      });

      performLogout();
      console.log('Logged out successfully');
    } catch (error) {
      console.error('Logout failed:', error);
      // 에러가 발생해도 로컬의 데이터는 삭제하고 홈으로 리다이렉트
      performLogout();
    }
  };

  const performLogout = () => {
    // 로컬 스토리지에서 토큰 제거
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');

    // 사용자 상태 초기화
    setUser(null);

    // 홈 페이지로 리다이렉트
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
      <TieredMenu model={items} popup ref={menu} breakpoint="767px" className="custom-tieredmenu w-36 p-0" />
      <Button
        onClick={handleToggle}
        rounded
        text
        severity="secondary"
        aria-label="Bookmark"
        className="p-2 focus:outline-none focus:shadow-none p-0 mr-[20px]"
      >
        <Avatar image={user.picture || userIcon} size="large" shape="circle" className="w-8 h-8" />
      </Button>
    </div>
  );
};

export default PopupMenu;
