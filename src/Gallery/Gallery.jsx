// to enable spreading of useSwipeable
/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect, useState } from 'react';
import { useSwipeable } from 'react-swipeable';
import PropTypes from 'prop-types';

// import css for the component
import componentStyle from './Gallery.module.css';

// import image categories and their associated images

import categories from '../img/imageLoader';

// keeps track of which images is to be displayed in the gallery
let currentIndex = 0;

// main function
function Gallery({ categorySelection, arrowKeyScroll }) {
  // handles changing the title of the gallery based on the catergory the user selects
  let title = Object.keys(categories)[0];
  if (Object.keys(categories)[categorySelection]) {
    title = Object.keys(categories)[categorySelection];
  }

  // handles changing the group of images based on the category the user selects
  let gallery = Object.values(categories)[0];
  if (categorySelection >= 0) {
    gallery = Object.values(categories)[categorySelection];
  }

  // creates a state containing the image object being shown in the gallery
  // starts at 1 so it can be changed to 0 to correctly highlight buttons
  const [currentImage, setCurrentImage] = useState(Object.values(gallery)[1]);

  // handles changing the image shown in galert
  const handleChangeImage = (index) => {
    // updates current index global variable
    currentIndex = index;
    // changes the highlighting of the buttons
    // eslint-disable-next-line no-param-reassign
    Object.values(gallery).forEach((image) => { image.selected = false; });
    Object.values(gallery)[index].selected = true;
    // changes the image
    setCurrentImage(Object.values(gallery)[index]);
  };

  // highlights the first button
  useEffect(() => {
    handleChangeImage(0);
  }, []);

  // refreshes the gallery when caregory changes
  useEffect(() => {
    const index = 0;
    handleChangeImage(index);
  }, [categorySelection]);

  // Secrolls to the next image to the left or right
  const handleScrollImage = (e) => {
    let direction = e;
    let index;
    if (typeof e === 'object') {
      direction = e.target.className;
    }
    const maxIndex = Object.values(gallery).length - 1;
    if (direction === 'left') {
      if (currentIndex === 0) {
        index = maxIndex;
      } else {
        index = currentIndex - 1;
      }
    } else if (direction === 'right') {
      if (currentIndex === maxIndex) {
        index = 0;
      } else {
        index = currentIndex + 1;
      }
    }

    // changes the current image and highlighting of the radial buttons to match
    handleChangeImage(index);
  };

  // in order to pass function to ref
  // eslint-disable-next-line no-param-reassign
  arrowKeyScroll.current = handleScrollImage;

  const handeSwipes = useSwipeable({
    onSwipedLeft: () => handleScrollImage('right'),
    onSwipedRight: () => handleScrollImage('left'),
    preventDefaultTouchmoveEvent: true,
    trackMouse: true,
    // onSwiped: (eventData) => console.log("User Swiped!", eventData),
  });

  // changes the image to the image selected on the radial buttons
  const handleSelectImage = (e) => {
    const index = parseInt(e.target.textContent, 10) - 1;
    handleChangeImage(index);
  };

  // defining properties
  Gallery.propTypes = {
    categorySelection: PropTypes.string.isRequired,
    arrowKeyScroll: PropTypes.objectOf(PropTypes.func),
  };

  // default arrowKeyScroll to null if none is provided
  Gallery.defaultProps = {
    arrowKeyScroll: null,
  };

  return (
    <div className={componentStyle.gallery}>
      <div className={componentStyle.header}>
        <h1>{title}</h1>
        <h2>-</h2>
        <div className={componentStyle.buttonBox}>
          {
          Object.values(gallery).map((image, index) => (
            <button
              type="button"
              className={image.selected ? componentStyle.clicked : ''}
              key={image.title}
              onClick={handleSelectImage}
            >
              {index + 1}
            </button>
          ))
        }
        </div>
      </div>
      <div className={componentStyle.imageBox}>
        <button type="button" className="left" onClick={handleScrollImage}>🠬</button>
        <div className={componentStyle.cardcontainer} {...handeSwipes}>
          <div className={componentStyle.card} key={currentImage.title}>
            <img src={currentImage.image} alt={`${currentImage.title} by ${currentImage.by}`} />
            <div className={componentStyle.credit}>
              <a className={componentStyle.byline} href={currentImage.link} target="_blank" rel="noreferrer">
                {`${currentImage.title} by ${currentImage.by}`}
              </a>
            </div>
          </div>
        </div>
        <button type="button" className="right" onClick={handleScrollImage}>🠮</button>
      </div>
    </div>
  );
}

export default Gallery;
