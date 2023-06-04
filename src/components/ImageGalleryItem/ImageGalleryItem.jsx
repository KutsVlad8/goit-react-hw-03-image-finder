import { GalleryItem, GalleryImg } from './ImageGalleryItem.styled';

export const ImageGalleryItem = ({ images, onClick }) => {
  return (
    <>
      {images.map(img => (
        <GalleryItem key={img.id} onClick={() => onClick(img)}>
          <GalleryImg src={img.webformatURL} alt={img.tags} />
        </GalleryItem>
      ))}
    </>
  );
};
