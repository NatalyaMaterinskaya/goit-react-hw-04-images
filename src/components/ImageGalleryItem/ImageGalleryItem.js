import PropTypes from 'prop-types';

import { useState } from 'react';
import { ImageGalleryItemWrapper, Image } from './ImageGalleryItem.styled';
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


export const ImageGalleryItem = ({image: { webformatURL, largeImageURL, tags }})  => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

    return (
      <ImageGalleryItemWrapper>
        <Image src={webformatURL} alt={tags} onClick={handleOpenModal} />
        <ReactModal
          isOpen={isModalOpen}
          onRequestClose={handleCloseModal}
          style={customStyles}
        >
          <img src={largeImageURL} alt={tags} />
        </ReactModal>
      </ImageGalleryItemWrapper>
    );
}

ImageGalleryItem.propTypes = {
  image: PropTypes.shape({
    id: PropTypes.number,
    webformatURL: PropTypes.string,
    largeImageURL: PropTypes.string,
    tags: PropTypes.string,
  }).isRequired,
};
