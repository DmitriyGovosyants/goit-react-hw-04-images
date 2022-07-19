import { useState, useEffect } from 'react';
import { animateScroll } from 'react-scroll';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { searchByName } from 'api/searchImgsApi';
import { SearchBar, ImageGallery, Button, Loader, Modal } from 'components';

export const App = () => {
  const [images, setImages] = useState([]);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);

  const [showLoader, setShowLoader] = useState(false);
  const [showLoadMore, setShowLoadMore] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [activeImgIdx, setActiveImgIdx] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (search === '') {
      return;
    }

    setShowLoadMore(false);
    setShowLoader(true);

    async function fetchImages() {
      try {
        const {
          data: { totalHits, hits },
          config: {
            params: { per_page },
          },
        } = await searchByName(search, page);

        if (hits.length === 0) {
          toast('Nothing was found');
        }

        const isEnd = page < Math.ceil(totalHits / per_page);

        setImages(s => [...s, ...hits]);
        setShowLoadMore(isEnd);

        animateScroll.scrollToBottom();
      } catch (error) {
        setError(error);
      } finally {
        setShowLoader(false);
      }
    }
    fetchImages();
  }, [search, page]);

  const handleSearchChange = ({ search }) => {
    setImages([]);
    setSearch(search.trim());
    setPage(1);
  };

  const setActiveIndex = activeImgIdx => {
    setActiveImgIdx(activeImgIdx);
  };

  return (
    <>
      <SearchBar onSubmit={handleSearchChange} />
      {error && (
        <p style={{ textAlign: 'center', fontSize: '30px' }}>{error.message}</p>
      )}
      {images.length > 0 && (
        <ImageGallery
          images={images}
          activeIndex={setActiveIndex}
          toggleModal={() => setShowModal(s => !s)}
        />
      )}
      {showLoader && <Loader />}
      {showLoadMore && (
        <Button type="button" onClick={() => setPage(s => s + 1)}>
          Load more
        </Button>
      )}
      {showModal && (
        <Modal toggleModal={() => setShowModal(s => !s)}>
          <img
            src={images[activeImgIdx].largeImageURL}
            alt={images[activeImgIdx].tags}
          />
        </Modal>
      )}
    </>
  );
};
