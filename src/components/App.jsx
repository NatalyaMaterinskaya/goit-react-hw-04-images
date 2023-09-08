import { useState } from 'react';
import { useEffect } from 'react';
import { fetchImages } from 'api';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Button } from 'components/Button/Button';
import { Loader } from './Loader/Loader';
import { ErrorItem } from './ErrorItem/ErrorItem';
import { GlobalStyle } from './GlobalStyle';

export const App = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [query, setQuery] = useState('');
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    if (!query) return;
    async function getImages() {
      try {
        setIsLoading(true);
        setError(false);
        const response = await fetchImages(cutQuery(query), page);

        const newImages = response.hits;
        if (newImages.length === 0) {
          throw new Error();
        }
        setImages(prevState => [...prevState, ...newImages]);

        const totalPages = Math.ceil(response.totalHits / 12);
        setTotalPages(totalPages);
      } catch (error) {
        setError(true);
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    }
    getImages();
  }, [query, page]);

  const handleSubmit = newQuery => {
    setQuery(`${Date.now()}/${newQuery}`);
    setImages([]);
    setPage(1);
  }

  const handleLoadMore = () => setPage(prevState => prevState + 1);

  const cutQuery = query => query.slice(query.indexOf('/') + 1, query.length);

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: '1fr',
        gridGap: '16px',
        paddingBottom: '24px',
      }}
    >
      <Searchbar onSubmit={handleSubmit} />

      {error && <ErrorItem />}

      {images.length > 0 && <ImageGallery images={images} />}

      {isLoading ? (
        <Loader />
      ) : (
        totalPages > 1 &&
        page !== totalPages &&
        !error && <Button onClick={handleLoadMore} />
      )}
      <GlobalStyle />
    </div>
  );
};
