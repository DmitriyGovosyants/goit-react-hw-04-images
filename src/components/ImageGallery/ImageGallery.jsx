import PropTypes from 'prop-types';
import { ImageGalleryItem } from 'components';
import { Gallery } from './ImageGallery.styled';

export const ImageGallery = ({ images, activeIndex, toggleModal }) => {
  return (
    <Gallery>
      {images.map(({ id, tags, webformatURL }, idx) => {
        return (
          <ImageGalleryItem
            key={id}
            idx={idx}
            tags={tags}
            activeIndex={activeIndex}
            toggleModal={toggleModal}
            smallImage={webformatURL}
          />
        );
      })}
    </Gallery>
  );
};

ImageGallery.propTypes = {
  images: PropTypes.array.isRequired,
  activeIndex: PropTypes.func.isRequired,
  toggleModal: PropTypes.func.isRequired,
};
