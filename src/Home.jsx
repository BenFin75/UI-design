import React from 'react';
import PropTypes from 'prop-types';

import Gallery from './Gallery';

function Home({ categorySelection }) {
  Home.propTypes = {
    categorySelection: PropTypes.string.isRequired,
  };

  return (
    <div className="home">
      <Gallery categorySelection={categorySelection} />
    </div>
  );
}

export default Home;
