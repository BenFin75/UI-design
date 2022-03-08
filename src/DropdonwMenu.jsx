import React from 'react';
import PropTypes from 'prop-types';

import categories from './img/imageLoader';

function DropdownMenu({ getCategorySelection }) {
  DropdownMenu.propTypes = {
    getCategorySelection: PropTypes.func.isRequired,
  };
  const handleSelection = (e) => {
    let selection;
    if (e.target.className === 'project-tag' || e.target.className === '') {
      selection = e.target.parentNode.className;
    } else {
      selection = e.target.className;
    }
    getCategorySelection(selection);
  };
  return (
    <div className="dropdown">
      <ul className="menu-list">
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

export default DropdownMenu;
