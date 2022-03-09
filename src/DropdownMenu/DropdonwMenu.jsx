import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Icon from '@mdi/react';
import { mdiCloseThick } from '@mdi/js';
import componentStyle from './DropdownMenu.module.css';

import categories from '../img/imageLoader';

function DropdownMenu({ getCategorySelection, menuUpdater }) {
  const [menuState, setMenuState] = useState(false);

  const updateMenuState = (() => {
    const updateMenu = (newState) => {
      setMenuState(newState);
    };
    const getMenuState = menuState;
    return { updateMenu, getMenuState };
  })();

  useEffect(() => {
    // the param must be reassigned
    // in order for useRef to be updated for callback
    // eslint-disable-next-line no-param-reassign
    menuUpdater.current = updateMenuState;
  });

  const handleSelection = (e) => {
    let selection;
    if (e.target.className === 'project-tag' || e.target.className === '') {
      selection = e.target.parentNode.className;
    } else {
      selection = e.target.className;
    }
    getCategorySelection(selection);
    if (window.innerWidth < 500) {
      setMenuState(false);
    }
  };

  const handleCloseMenu = () => {
    setMenuState(false);
  };

  return (
    <div className={`${componentStyle.dropdown} ${menuState ? componentStyle.open : ''} `}>
      <ul>
        <li className={componentStyle.exit}>
          <button
            className={componentStyle.exitbtn}
            type="button"
            onClick={handleCloseMenu}
          >
            <Icon
              className={componentStyle.closeIcon}
              path={mdiCloseThick}
              title="User Profile"
              size={1.25}
            />
          </button>
        </li>
        {Object.keys(categories).map((category, index) => (
          <li key={category}>
            <button type="button" className={index} onClick={handleSelection} onKeyDown={handleSelection}>
              {category}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

DropdownMenu.propTypes = {
  getCategorySelection: PropTypes.func.isRequired,
  menuUpdater: PropTypes.objectOf(PropTypes.shape({
    updateMenu: PropTypes.func,
    getMenuState: PropTypes.bool,
  })),
};

DropdownMenu.defaultProps = {
  menuUpdater: null,
};

export default DropdownMenu;
