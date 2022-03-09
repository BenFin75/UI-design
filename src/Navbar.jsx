import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import Icon from '@mdi/react';
import { mdiMenu } from '@mdi/js';

function Navbar({ menuUpdater }) {
  let menuChange = false;

  const handleMenu = () => {
    const menuIcon = document.querySelector('.menu-icon');
    menuIcon.classList.toggle('open');
    menuChange = !menuChange;
    menuUpdater.current(menuChange);
  };

  useEffect(() => {
    if (menuUpdater.current != null) {
      menuUpdater.current(true);
    }
  }, [menuChange]);

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

Navbar.propTypes = {
  menuUpdater: PropTypes.objectOf(PropTypes.func).isRequired,
};

export default Navbar;
