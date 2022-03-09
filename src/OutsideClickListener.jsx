// adapted from
// https://stackoverflow.com/questions/32553158/detect-click-outside-react-component

import React, { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';

/**
 * Hook that alerts clicks outside of the passed ref
 */
function useOutsideAlerter(ref, menuUpdater) {
  useEffect(() => {
    /**
         * Alert if clicked on outside of element
         */
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        menuUpdater.current.updateMenu(false);
      }
    }

    // Bind the event listener
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [ref]);
}

/**
 * Component that alerts if you click outside of it
 */
function OutsideAlerter(props) {
  const { menuUpdater } = props;
  const wrapperRef = useRef(null);
  useOutsideAlerter(wrapperRef, menuUpdater);
  const { children } = props;

  return (
    <div ref={wrapperRef}>
      {Object.values(children)[0]}
      {Object.values(children)[1]}
    </div>
  );
}

OutsideAlerter.propTypes = {
  menuUpdater: PropTypes.objectOf(PropTypes.shape({
    updateMenu: PropTypes.func,
    getMenuState: PropTypes.bool,
  })).isRequired,
  children: PropTypes.arrayOf(PropTypes.element).isRequired,
};

export default OutsideAlerter;
