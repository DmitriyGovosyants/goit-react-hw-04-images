import PropTypes from 'prop-types';
import { GalleryItem, GalleryImage } from './ImageGalleryItem.styled';

export const ImageGalleryItem = ({
  smallImage,
  toggleModal,
  tags,
  activeIndex,
  idx,
}) => {
  return (
    <GalleryItem>
      <GalleryImage
        src={smallImage}
        alt={tags}
        onClick={() => {
          toggleModal();
          activeIndex(idx);
        }}
      />
    </GalleryItem>
  );
};

ImageGalleryItem.propTypes = {
  smallImage: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
  toggleModal: PropTypes.func.isRequired,
  activeIndex: PropTypes.func.isRequired,
};
