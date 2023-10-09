import React from 'react';
import { Component } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import { Overlay, ModalStyled } from './Modal.styled';
import Spiner from 'components/Loader/Loader';

const modalRoot = document.querySelector('#modal-root');

export default class CustomModal extends Component {
  static  = {
    selectedImage: PropTypes.string,
    tags: PropTypes.string,
    onClose: PropTypes.func,
  };

  state = {
    isLoading: true,
  };

  componentDidMount() {
    const { selectedImage } = this.props;
    const image = new Image();
    image.src = selectedImage;
    image.onload = () => {
      this.setState({ isLoading: false });
    };
  }

  componentWillUnmount() {
    this.setState({ isLoading: true }); 
  }

  handleKeyDown = e => {
    if (e.code === 'Escape') {
      this.props.onClose();
    }
  };

  handleBackdropClick = e => {
    if (e.target === e.currentTarget) {
      this.props.onClose();
    }
  };
  render() {
    const { selectedImage, tags } = this.props;
    const { isLoading } = this.state;


    return createPortal(
      <Overlay onClick={this.handleBackdropClick}>
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
}