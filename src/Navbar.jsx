import React from 'react';
import Icon from '@mdi/react';
import { mdiMenu } from '@mdi/js';

const handleMenu = () => {
  const menuIcon = document.querySelector('.menu-icon');
  menuIcon.classList.toggle('open');
  const menu = document.querySelector('.dropdown');
  menu.classList.toggle('open');
  // if (menuIcon.classList.contains('open')) {
  //   menu.style.height = 'auto';
  // } else {
  //   menu.style.height = '0px';
  // }
};

function Navbar() {
  return (
    <div className="navbar">
      <div className="menu-button">
        <Icon
          className="menu-icon"
          path={mdiMenu}
          title="User Profile"
          size={1.25}
          onClick={handleMenu}
        />
      </div>
      <h1 className="logo">Image Gallery</h1>
    </div>
  );
}

export default Navbar;
