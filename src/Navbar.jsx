import React from 'react';
import PropTypes from 'prop-types';
import Icon from '@mdi/react';
import { mdiMenu } from '@mdi/js';

function Navbar({ menuUpdater }) {
  const handleMenu = () => {
    const menuChange = menuUpdater.current.getMenuState;
    menuUpdater.current.updateMenu(!menuChange);
  };

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
  menuUpdater: PropTypes.objectOf(PropTypes.shape({
    updateMenu: PropTypes.func,
    getMenuState: PropTypes.bool,
  })).isRequired,
};

export default Navbar;
