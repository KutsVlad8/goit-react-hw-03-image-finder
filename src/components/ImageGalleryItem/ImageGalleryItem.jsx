import { GalleryItem, GalleryImg } from './ImageGalleryItem.styled';

export const ImageGalleryItem = ({ images, onClick }) => {
  return (
    <>
      {images.hits.map(img => (
        <GalleryItem key={img.id} onClick={() => onClick(img.id)}>
          <GalleryImg src={img.webformatURL} alt={img.tags} />
        </GalleryItem>
      ))}
    </>
  );
};