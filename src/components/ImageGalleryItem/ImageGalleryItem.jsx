import { ImageGalleryItemStyled, ImageGalleryItemImg } from "./ImageGalleryItem.styled";

export const ImageGalleryItem = ( {tags, smallImg, onImageClick} ) => {

  return (
    <ImageGalleryItemStyled onClick={onImageClick}>
      <ImageGalleryItemImg src={smallImg} alt={tags} />
    </ImageGalleryItemStyled>
  )
 }