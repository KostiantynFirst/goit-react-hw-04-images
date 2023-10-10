import React, { useEffect } from 'react';
import { useState } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import { Overlay, ModalStyled } from './Modal.styled';
import Spiner from 'components/Loader/Loader';

const modalRoot = document.querySelector('#modal-root');

export default function CustomModal ({ selectedImage, tags, onClose }) {

const [isLoading, setIsLoading] = useState(true)

useEffect (() => {
  const image = new Image();
  image.src = selectedImage;
  image.onload = () => {
    setIsLoading(false);
  };

  return () => {
    setIsLoading(true);
  }

}, [selectedImage])

  const handleKeyDown = e => {
    if (e.code === 'Escape') {
      onClose();
    }
  };

  (() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
})();

  const handleBackdropClick = e => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

return createPortal(
    <Overlay onClick={handleBackdropClick} >
      {isLoading ? (
        <Spiner /> // Show the spinner while the image is loading
      ) : (
        <ModalStyled>
          <img src={selectedImage} alt={tags} />
        </ModalStyled>
      )}
    </Overlay>,
    modalRoot
  );
}

CustomModal.propTypes  = {
  selectedImage: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
};