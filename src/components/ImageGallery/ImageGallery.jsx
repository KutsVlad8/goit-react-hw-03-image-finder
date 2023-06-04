import { Component } from 'react';
import { getImages } from '../servise/api';
import { GalleryList, TextContainer, Text } from './ImageGallery.styled';
import { ImageGalleryItem } from '../ImageGalleryItem/ImageGalleryItem';
import { Loader } from '../Loader/Loader';
import { LoadMore } from '../Button/Button';

const URL = 'https://pixabay.com/api/';
const API_KEY = '35615782-928d74ab541d750ac5cbbfeab';

export class ImageGallery extends Component {
  state = {
    images: null,
    error: null,
    status: 'idle',
    page: 1,
    perPage: 12,
  };

  async componentDidUpdate(prevProps, prevState) {
    const prevProp = prevProps.query;
    const nextProp = this.props.query;
    const nextState = this.state;

    console.log(prevState.page);
    console.log(this.state.page);
    console.log(prevState.images);
    console.log(this.state.images);

    if (prevProp !== nextProp) {
      this.setState({ status: 'pending', page: 1 });

      try {
        const array = await getImages(this.props.query, this.state.page);
        this.setState({ images: array.hits, status: 'resolved' });
      } catch (error) {
        this.setState({ error: error.message, status: 'rejected' });
      }

      // fetch(
      //   `${URL}?q=${this.props.query}&page=${this.state.page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=${this.state.perPage}`
      // )
      //   .then(response => {
      //     if (response.ok) {
      //       return response.json();
      //     }
      //     return Promise.reject(
      //       new Error(`Нет фото по  запросу ${this.props.query}`)
      //     );
      //   })
      //   .then(images =>
      //     this.setState({ images: images.hits, status: 'resolved' })
      //   )
      //   .catch(error => this.state({ error, status: 'rejected' }));
    }

    if (prevState.page !== nextState.page) {
      this.setState({ status: 'pending' });

      fetch(
        `${URL}?q=${this.props.query}&page=${this.state.page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=${this.state.perPage}`
      )
        .then(response => {
          if (response.ok) {
            return response.json();
          }
          return Promise.reject(
            new Error(`Нет фото по  запросу ${this.props.query}`)
          );
        })
        .then(images =>
          this.setState(prevState => ({
            images: [...prevState.images, ...images.hits],
            status: 'resolved',
          }))
        )
        .catch(error => this.state({ error, status: 'rejected' }));
    }
  }

  handlerLoadMore = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };

  getImageId = imgId => {
    console.log(imgId);
  };

  render() {
    const { images, status, error } = this.state;

    if (status === 'idle') {
      return (
        <TextContainer>
          <Text>Введите данные для поиска</Text>
        </TextContainer>
      );
    }

    if (status === 'pending') {
      return <Loader />;
    }

    if (status === 'rejected') {
      return (
        <TextContainer>
          <Text>{error}</Text>
        </TextContainer>
      );
    }
    if (images.total === 0) {
      return (
        <TextContainer>
          <Text>По вашему запросу ни чего не найдено</Text>
        </TextContainer>
      );
    }

    if (status === 'resolved' && images.total !== 0) {
      return (
        <>
          <GalleryList>
            <ImageGalleryItem
              images={this.state.images}
              onClick={this.getImageId}
            />
          </GalleryList>
          <LoadMore onClick={this.handlerLoadMore} />
        </>
      );
    }
  }
}
