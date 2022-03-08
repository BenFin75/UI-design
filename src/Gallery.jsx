import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import categories from './img/imageLoader';

let currentIndex = 0;

function Gallery({ categorySelection }) {
  Gallery.propTypes = {
    categorySelection: PropTypes.string.isRequired,
  };

  const refreshPage = true;

  let title = Object.keys(categories)[0];
  if (Object.keys(categories)[categorySelection]) {
    title = Object.keys(categories)[categorySelection];
  }

  let images = Object.values(categories)[0];
  if (categorySelection >= 0) {
    images = Object.values(categories)[categorySelection];
  }

  useEffect(() => {
    const firstButton = document.querySelector('.header button');
    firstButton.classList.add('clicked');
  }, []);

  const [currentImage, setCurrentImage] = useState(Object.values(images)[currentIndex]);

  useEffect(() => {
    if (refreshPage) {
      currentIndex = 0;
      const headerButtons = document.querySelectorAll('.header > button');
      headerButtons.forEach((button) => button.classList.remove('clicked'));
      headerButtons[currentIndex].classList.add('clicked');
      setCurrentImage(Object.values(images)[currentIndex]);
    }
  }, [categorySelection]);

  const handleScrollImage = (e) => {
    const direction = e.target.className;
    const maxIndex = Object.values(images).length - 1;
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
    const headerButtons = document.querySelectorAll('.header > button');
    headerButtons.forEach((button) => button.classList.remove('clicked'));
    headerButtons[currentIndex].classList.add('clicked');
    setCurrentImage(Object.values(images)[currentIndex]);
  };

  const handleChangeImage = (e) => {
    const index = parseInt(e.target.className, 10);
    const headerButtons = document.querySelectorAll('.header > button');
    headerButtons.forEach((button) => button.classList.remove('clicked'));
    currentIndex = index;
    headerButtons[currentIndex].classList.add('clicked');
    setCurrentImage(Object.values(images)[index]);
  };

  return (
    <div className="gallery">
      <div className="header">
        <h1>{title}</h1>
        <h1>-</h1>
        {
        Object.values(images).map((image, index) => (
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
