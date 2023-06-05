import { Component } from 'react';
import { TextContainer, Text } from './App.styled';
import { getImages } from '../servise/api';
import { Searchbar } from '../Searchbar/Searchbar';
import { ImageGallery } from '../ImageGallery/ImageGallery';
import { Modal } from '../Modal/Modal';
import { LoadMore } from '../Button/Button';
import { Loader } from '../Loader/Loader';

export class App extends Component {
  state = {
    query: '',
    images: [],
    page: 1,
    totalHits: null,
    error: null,
    loading: false,
    showModal: false,
    modalImg: null,
  };

  async componentDidUpdate(prevProps, prevState) {
    const prevQuery = prevState.query;
    const nextQuery = this.state.query;
    const prevPage = prevState.page;
    const nextState = this.state;

    const array = await getImages(this.state.query, this.state.page);

    if (prevQuery !== nextQuery) {
      this.setState({ loading: true, page: 1 });

      try {
        this.setState({ images: array.hits, totalHits: array.totalHits });
      } catch (error) {
        console.dir(error);
        this.setState({ error: error });
      } finally {
        this.setState({ loading: false });
      }
    }

    if (prevPage !== nextState.page) {
      try {
        this.setState(prevState => ({
          images: [...prevState.images, ...array.hits],
        }));
      } catch (error) {
        this.setState({ error: error });
      }
    }
  }

  handleSubmitForm = query => {
    this.setState({ query });
  };

  handleLoadMore = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };

  openModal = img => {
    this.setState({ modalImg: img.largeImageURL, showModal: true });
  };

  closeModal = () => {
    this.setState({ showModal: false });
  };

  render() {
    const { images, error, loading, page, totalHits } = this.state;
    return (
      <div>
        <Searchbar onSubmit={this.handleSubmitForm} />

        {totalHits === 0 && (
          <TextContainer>
            <Text>По вашему запросу {this.state.query} ни чего не найдено</Text>
          </TextContainer>
        )}

        {loading && <Loader />}

        {error && (
          <TextContainer>
            <Text>{error}</Text>
          </TextContainer>
        )}

        {images && <ImageGallery images={images} onClick={this.openModal} />}

        {totalHits / images.length > page && (
          <LoadMore onClick={this.handleLoadMore} />
        )}

        {this.state.showModal && (
          <Modal onClose={this.closeModal}>
            <img src={this.state.modalImg} alt="" />
          </Modal>
        )}
      </div>
    );
  }
}
