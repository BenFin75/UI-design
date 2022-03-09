// to allow a key listner on the whole page
// for navigating menu with arrow keys
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/no-noninteractive-tabindex */
import React, { useRef } from 'react';
import PropTypes from 'prop-types';

import Gallery from './Gallery/Gallery';

function Home({ categorySelection }) {
  const arrowKeyScroll = useRef(null);

  Home.propTypes = {
    categorySelection: PropTypes.string.isRequired,
  };

  const handleKeyDown = (e) => {
    if (arrowKeyScroll.current != null) {
      if (e.key === 'ArrowLeft') {
        arrowKeyScroll.current('left');
      } else if (e.key === 'ArrowRight') {
        arrowKeyScroll.current('right');
      }
    }
  };

  return (

    <div className="home" onKeyDown={handleKeyDown} tabIndex="0">
      <Gallery categorySelection={categorySelection} arrowKeyScroll={arrowKeyScroll} />
    </div>
  );
}

export default Home;
