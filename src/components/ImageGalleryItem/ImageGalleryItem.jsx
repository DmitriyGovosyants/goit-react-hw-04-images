import PropTypes from 'prop-types';
import { useState } from 'react';
import { Modal } from 'components';
import { GalleryItem, GalleryImage } from './ImageGalleryItem.styled';

export const ImageGalleryItem = ({ smallImage, bigImage, tags }) => {
  const [showModal, setShowModal] = useState(false);

  return (
    <GalleryItem>
      <GalleryImage
        src={smallImage}
        alt={tags}
        onClick={() => setShowModal(s => !s)}
      />
      {showModal && (
        <Modal toggleModal={() => setShowModal(s => !s)}>
          <img src={bigImage} alt={tags} />
        </Modal>
      )}
    </GalleryItem>
  );
};

ImageGalleryItem.propTypes = {
  smallImage: PropTypes.string.isRequired,
  bigImage: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
};
