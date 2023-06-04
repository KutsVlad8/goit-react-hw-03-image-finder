import { GalleryList } from './ImageGallery.styled';
import { ImageGalleryItem } from '../ImageGalleryItem/ImageGalleryItem';

export const ImageGallery = ({ images, onClick }) => {
  return (
    <GalleryList>
      <ImageGalleryItem images={images} onClick={onClick} />
    </GalleryList>
  );
};
