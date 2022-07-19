import { useState, useEffect } from 'react';
import { animateScroll } from 'react-scroll';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { searchByName } from 'api/searchImgsApi';
import { SearchBar, ImageGallery, Button, Loader } from 'components';

export const App = () => {
  const [images, setImages] = useState([]);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [error, setError] = useState(null);

  const [endContent, setEndContent] = useState(true);
  const [status, setStatus] = useState('idle');

  useEffect(() => {
    if (search === '') {
      return;
    }

    setStatus('pending');

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
        setEndContent(isEnd);

        setImages(s => [...s, ...hits]);
        setStatus('resolved');
        animateScroll.scrollToBottom();
      } catch (error) {
        setError(error);
        setStatus('rejected');
      }
    }
    fetchImages();
  }, [page, search]);

  const handleSearchChange = ({ query }) => {
    if (query === search) {
      return toast('You’re already watching this');
    }
    setImages([]);
    setSearch(query.trim());
    setPage(1);
  };

  if (status === 'idle') {
    return <SearchBar onSubmit={handleSearchChange} />;
  }

  if (status === 'pending') {
    return (
      <>
        <SearchBar onSubmit={handleSearchChange} />
        <ImageGallery images={images} />
        <Loader />
      </>
    );
  }

  if (status === 'rejected') {
    return (
      <>
        <SearchBar onSubmit={handleSearchChange} />
        <p style={{ textAlign: 'center', fontSize: '30px' }}>{error.message}</p>
      </>
    );
  }

  if (status === 'resolved') {
    return (
      <>
        <SearchBar onSubmit={handleSearchChange} />
        <ImageGallery images={images} />
        {endContent && (
          <Button type="button" onClick={() => setPage(s => s + 1)}>
            Load more
          </Button>
        )}
      </>
    );
  }
};
