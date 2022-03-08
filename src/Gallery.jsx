import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

// import image categories and their associated images
import categories from './img/imageLoader';

// keeps track of which images is to be displayed in the gallery
let currentIndex = 0;

// main function
function Gallery({ categorySelection }) {
  // category should be a numeric string representing which category the user selected
  Gallery.propTypes = {
    categorySelection: PropTypes.string.isRequired,
  };

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

  // highlights the first button when the page loads to match with the first image being displayed
  useEffect(() => {
    const firstButton = document.querySelector('.header button');
    firstButton.classList.add('clicked');
  }, []);

  // creates a state containing the image object being shown in the gallery
  const [currentImage, setCurrentImage] = useState(Object.values(gallery)[currentIndex]);

  // refreshes the gallery when caregory changes
  useEffect(() => {
    currentIndex = 0;
    const headerButtons = document.querySelectorAll('.header > button');
    headerButtons.forEach((button) => button.classList.remove('clicked'));
    headerButtons[currentIndex].classList.add('clicked');
    setCurrentImage(Object.values(gallery)[currentIndex]);
  }, [categorySelection]);

  // Secrolls to the next image to the left or right
  const handleScrollImage = (e) => {
    const direction = e.target.className;
    const maxIndex = Object.values(gallery).length - 1;
    if (direction === 'left') {
      if (currentIndex === 0) {
        currentIndex = maxIndex;
      } else {
        currentIndex -= 1;
      }
    } else if (direction === 'right') {
      if (currentIndex === maxIndex) {
        currentIndex = 0;
      } else {
        currentIndex += 1;
      }
    }
    // changes the highlighting of the radial buttons to match the current image
    const headerButtons = document.querySelectorAll('.header > button');
    headerButtons.forEach((button) => button.classList.remove('clicked'));
    headerButtons[currentIndex].classList.add('clicked');
    setCurrentImage(Object.values(gallery)[currentIndex]);
  };

  // changes the image to the image selected on the radial buttons
  const handleChangeImage = (e) => {
    const index = parseInt(e.target.className, 10);
    // changes the highlighting of the buttons
    const headerButtons = document.querySelectorAll('.header > button');
    headerButtons.forEach((button) => button.classList.remove('clicked'));
    currentIndex = index;
    headerButtons[currentIndex].classList.add('clicked');
    // changes the image
    setCurrentImage(Object.values(gallery)[index]);
  };

  return (
    <div className="gallery">
      <div className="header">
        <h1>{title}</h1>
        <h1>-</h1>
        {
        Object.values(gallery).map((image, index) => (
          <button
            type="button"
            className={index}
            key={image.title}
            onClick={handleChangeImage}
          >
            {index + 1}
          </button>
        ))
      }
      </div>
      <div className="image-box">
        <button type="button" className="left" onClick={handleScrollImage}>🠬</button>
        <div className="cardcontainer">
          <div className="card" key={currentImage.title}>
            <img src={currentImage.image} alt={`${currentImage.title} by ${currentImage.by}`} />
            <div className="credit">
              <a className="byline" href={currentImage.link} target="_blank" rel="noreferrer">
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
