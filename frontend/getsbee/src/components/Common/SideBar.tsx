import React, { useState } from 'react';
import { Sidebar } from 'primereact/sidebar';
import { Button } from 'primereact/button';
import { Link } from 'react-router-dom';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import './SideBar.css';
import beeIcon from '../../assets/beeIcon.png';
import foldIcon from '../../assets/foldIcon.png';
import homeIcon from '../../assets/homeIcon.png';
import recommendIcon from '../../assets/recommendIcon.png';
import myhiveIcon from '../../assets/myhiveIcon.png';
import aboutIcon from '../../assets/aboutIcon.png';

const SideBar: React.FC = () => {
  const [visible, setVisible] = useState<boolean>(false);

  const handleFoldIconClick = () => {
    setVisible(false);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLImageElement>) => {
    if (event.key === 'Escape') {
      handleFoldIconClick();
    }
  };

  return (
    <div>
      <Sidebar visible={visible} onHide={() => setVisible(false)} modal={false} className="p-sidebar">
        <img
          className="foldIcon"
          src={foldIcon}
          alt="foldIcon"
          onClick={handleFoldIconClick}
          onKeyDown={handleKeyDown}
        />
        <Link to="/home" className="sidebar-title">
          <img className="beeIcon" src={beeIcon} alt="beeIcon" />
          <h2 className="title">getsBee</h2>
        </Link>

        <div className="sidebar-links">
          <Link to="/home" className="sidebar-link">
            <img className="sidebar-icon" src={homeIcon} alt="Home" />
            <span className="sidebar-text">Home</span>
          </Link>
          <Link to="/recommend" className="sidebar-link">
            <img className="sidebar-icon" src={recommendIcon} alt="Recommend" />
            <span className="sidebar-text">Recommend</span>
          </Link>
          <Link to="/myhive" className="sidebar-link">
            <img className="sidebar-icon" src={myhiveIcon} alt="MyHive" />
            <span className="sidebar-text">MyHive</span>
          </Link>
          <Link to="/about" className="sidebar-link">
            <img className="sidebar-icon" src={aboutIcon} alt="About" />
            <span className="sidebar-text">About</span>
          </Link>
        </div>
      </Sidebar>
      <Button className={`sidebar-button ${visible ? 'shifted' : ''}`} onClick={() => setVisible(true)} />
    </div>
  );
};

export default SideBar;
