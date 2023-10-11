import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect, useState } from "react";
import { AppStyled } from "./App.styled";
import { FetchMaterials } from "services/api";
import { Searchbar } from "components/Searchbar/Searchbar";
import { ImageGallery } from "components/ImageGallery/ImageGallery";
import CustomModal from "components/Modal/Modal";
import { Button } from "components/Button/Button";
import Loader from "components/Loader/Loader";

const App = () => {

const [searchQuery, setSearchQuery] = useState("");
const [images, setImages] = useState([]);
const [page, setPage] = useState(1);
const [selectedImage, setSelectedImage] = useState(null);
// const [loading, setLoading] = useState(false);
const [alt, setAlt] = useState(null);
const [status, setStatus] = useState("idle");
const [totalHits, setTotalHits] = useState(null);


useEffect (() => {

  
  if (searchQuery !== '' && page > 0) {
    setStatus('pending');
    return;
  }  

const fetchdata = async () => {

    try {
      const imageData = await FetchMaterials(searchQuery, page);
      const imagesHits = imageData.hits;
       
      setImages((prevImages) => [...prevImages, ...imagesHits]);
      setTotalHits(imageData.total);

      if (page > 1) {
        const CARD_HEIGHT = 300;
        window.scrollBy({
          top: CARD_HEIGHT * 2,
          behavior: "smooth",
        });
      }

      setStatus('resolved');
    } catch (error) {
      toast.error(`Sorry something went wrong. ${error.message}`);
      setStatus('rejected');
    }
  };

  
  fetchdata();
}, [page, searchQuery, status]);

  const handleFormSubmit = (searchQuery) => {
    if (searchQuery === '') {
      toast.warning('Please enter a search query')
      return;
    }

    setSearchQuery(searchQuery);
    setPage(1);
    setImages([]);
    setStatus('pending');
    // setAlt(null);
    // setSelectedImage(null);

  }

  const handleSelectedImage = (largeImageUrl, tags) => {
    setSelectedImage(largeImageUrl);
    setAlt(tags);
  };

  const loadMore = () => {
    setPage((prevPage) => prevPage + 1);
    setStatus('pending');
  };

  const closeModal = () => {
    setSelectedImage(null);
    setAlt(null);
  };

  const showLoadMoreButton = images.length > 0 && images.length !== totalHits;

  return (
    <AppStyled>
      <Searchbar onSubmit={handleFormSubmit} />
      <ToastContainer autoClose={3000} theme="colored" pauseOnHover />
      {status === "pending" && <Loader />}
      <ImageGallery images={images} onImageClick={handleSelectedImage} />
      {selectedImage && (
        <CustomModal
          selectedImage={selectedImage}
          tags={alt}
          onClose={closeModal}
        />
      )}
      {showLoadMoreButton && <Button onClick={loadMore} />}
    </AppStyled>
  );

}

export default App;