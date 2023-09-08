import PropTypes from 'prop-types';

import { ImageGalleryItemWrapper, Image } from './ImageGalleryItem.styled';
import { Component } from 'react';
import ReactModal from 'react-modal';

const customStyles = {
  overlay: {
    zIndex: '200',
    backgroundColor: 'rgba(0, 0, 0, 0.75)',
  },
  content: {
    maxWidth: '1000px',
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    padding: 'none',
  },
};

ReactModal.setAppElement('#root');

export class ImageGalleryItem extends Component {
  state = {
    isModalOpen: false,
  };

  handleOpenModal = () => this.setState({ isModalOpen: true });
  handleCloseModal = () => this.setState({ isModalOpen: false });

  render() {
    const {
      image: { webformatURL, largeImageURL, tags },
    } = this.props;

    return (
      <ImageGalleryItemWrapper>
        <Image src={webformatURL} alt={tags} onClick={this.handleOpenModal} />
        <ReactModal
          isOpen={this.state.isModalOpen}
          onRequestClose={this.handleCloseModal}
          style={customStyles}
        >
          <img src={largeImageURL} alt={tags} />
        </ReactModal>
      </ImageGalleryItemWrapper>
    );
  }
}

ImageGalleryItem.propTypes = {
  image: PropTypes.shape({
    id: PropTypes.number,
    webformatURL: PropTypes.string,
    largeImageURL: PropTypes.string,
    tags: PropTypes.string,
  }).isRequired,
};
