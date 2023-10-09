import { ImageGalleryStyled } from "./ImageGallery.styled";
import { ImageGalleryItem } from "components/ImageGalleryItem/ImageGalleryItem";

export const ImageGallery = ({images, onImageClick }) => {
    return (
        <ImageGalleryStyled>
            {images.map(({id, webformatURL, tags, largeImageURL}) => (
                <ImageGalleryItem 
                    key={id}
                    smallImg={webformatURL}
                    tags={tags}
                    onImageClick={() => onImageClick(largeImageURL, tags)}
                />
                
                
            ))}
        </ImageGalleryStyled>
    )
}