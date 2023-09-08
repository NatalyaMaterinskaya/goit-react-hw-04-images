import { Component } from 'react';
import { fetchImages } from 'api';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Button } from 'components/Button/Button';
import { Loader } from './Loader/Loader';
import { ErrorItem } from './ErrorItem/ErrorItem';
import { GlobalStyle } from './GlobalStyle';

export class App extends Component {
  state = {
    isLoading: false,
    error: false,
    query: '',
    images: [],
    page: 1,
    perPage: 12,
    totalPages: 1,
  };

  async componentDidUpdate(_, prevState) {
    const { query, page, perPage } = this.state;
    if (prevState.query !== query || prevState.page !== page) {
      try {
        this.setState({ isLoading: true });
        this.setState({ error: false });

        const response = await fetchImages(this.cutQuery(query), page, perPage);

        const newImages = response.hits;
        if (newImages.length === 0) {
          throw new Error();
        }
        this.setState(prevState => ({
          images: [...prevState.images, ...newImages],
        }));

        const totalPages = Math.ceil(response.totalHits / perPage);
        this.setState({ totalPages });
      } catch (error) {
        this.setState({ error: true });
        console.log(error);
      } finally {
        this.setState({ isLoading: false });
      }
    }
  }

  handleSubmit = newQuery => {
    this.setState({
      query: `${Date.now()}/${newQuery}`,
      images: [],
      page: 1,
    });
  };

  handleLoadMore = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };

  cutQuery = query => query.slice(query.indexOf('/') + 1, query.length);

  render() {
    const { error, isLoading, images, page, totalPages } = this.state;

    return (
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr',
          gridGap: '16px',
          paddingBottom: '24px',
        }}
      >
        <Searchbar onSubmit={this.handleSubmit} />

        {error && <ErrorItem />}

        {images.length > 0 && <ImageGallery images={images} />}

        {isLoading ? (
          <Loader />
        ) : (
          totalPages > 1 &&
          page !== totalPages && !error && <Button onClick={this.handleLoadMore} />
        )}
        <GlobalStyle />
      </div>
    );
  }
}
