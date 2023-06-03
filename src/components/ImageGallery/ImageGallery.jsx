import { Component } from 'react';
import { GalleryList, TextContainer, Text } from './ImageGallery.styled';
import { ImageGalleryItem } from '../ImageGalleryItem/ImageGalleryItem';
import { Loader } from '../Loader/Loader';

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

  componentDidUpdate(prevProps, prevState) {
    const prevProp = prevProps.query;
    const nextProp = this.props.query;

    if (prevProp !== nextProp) {
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
        .then(images => this.setState({ images, status: 'resolved' }))
        .catch(error => this.state({ error, status: 'rejected' }));
    }
  }

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
          <Text>{error.message}</Text>
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
        <GalleryList>
          <ImageGalleryItem
            images={this.state.images}
            onClick={this.getImageId}
          />
        </GalleryList>
      );
    }
  }
}
