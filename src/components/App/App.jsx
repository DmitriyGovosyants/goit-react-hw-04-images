import { Component } from 'react';
import { animateScroll } from 'react-scroll';
import { ToastContainer } from 'react-toastify';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { searchByName } from 'api/searchImgsApi';
import { SearchBar, ImageGallery, Button, Loader, Modal } from 'components';
import { Section } from './App.styled';

export class App extends Component {
  state = {
    search: '',
    images: [],
    page: 1,
    showLoader: false,
    showLoadMore: false,
    showModal: false,
    activeImgIdx: null,
    error: null,
  };

  handleSearchChange = ({ search }) => {
    this.setState({ search: search.trim(), page: 1, images: [] });
  };

  componentDidUpdate(prevProps, prevState) {
    const { page, search } = this.state;
    const { handlePhotosAdd } = this;

    if (prevState.search !== search || prevState.page !== page) {
      handlePhotosAdd(search, page);
    }
  }

  handlePhotosAdd = async (query, page) => {
    this.setState({ showLoader: true, showLoadMore: false });

    try {
      const {
        data: { totalHits, hits },
        config: {
          params: { per_page },
        },
      } = await searchByName(query, page);

      if (hits.length === 0) {
        toast('Nothing was found');
      }

      const showLoadMore = page < Math.ceil(totalHits / per_page);

      this.setState(prev => ({
        images: [...prev.images, ...hits],
        showLoadMore,
      }));

      animateScroll.scrollToBottom();
    } catch (error) {
      this.setState({ error });
    } finally {
      this.setState({ showLoader: false });
    }
  };

  handleLoadMore = () => {
    this.setState(prev => ({ page: prev.page + 1 }));
  };

  toggleModal = () => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
    }));
  };

  setActiveIndex = activeImgIdx => {
    this.setState({ activeImgIdx });
  };

  render() {
    const { showLoader, showLoadMore, showModal, images, activeImgIdx, error } =
      this.state;
    const { handleLoadMore, toggleModal, setActiveIndex, handleSearchChange } =
      this;

    return (
      <>
        <Section>
          <SearchBar onSubmit={handleSearchChange} />
          {error && <p>{error.message}</p>}
          {images.length > 0 && (
            <ImageGallery
              images={images}
              activeIndex={setActiveIndex}
              toggleModal={toggleModal}
            />
          )}
          {showLoader && <Loader />}
          {showLoadMore && (
            <Button type="button" onClick={handleLoadMore}>
              Load more
            </Button>
          )}
          {showModal && (
            <Modal toggleModal={toggleModal}>
              <img
                src={images[activeImgIdx].largeImageURL}
                alt={images[activeImgIdx].tags}
              />
            </Modal>
          )}
        </Section>
        <ToastContainer autoClose={2500} />
      </>
    );
  }
}
