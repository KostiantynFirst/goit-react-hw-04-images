import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import React, { Component } from "react";
import { AppStyled } from "./App.styled";
import { FetchMaterials } from "services/api";
import { Searchbar } from "components/Searchbar/Searchbar";
import { ImageGallery } from "components/ImageGallery/ImageGallery";
import CustomModal from "components/Modal/Modal";
import { Button } from "components/Button/Button";
import Loader from "components/Loader/Loader";

class App extends Component {
  state = {
    searchQuery: "",
    images: [],
    page: 1,
    selectedImage: null,
    alt: null,
    isLoading: false,
    isLastPage: false,
    status: "idle",
    totalHits: null,
  };

  async componentDidUpdate(prevProps, prevState) {
    const { page, searchQuery } = this.state;
    if (prevState.searchQuery !== searchQuery || prevState.page !== page) {
      this.setState({ status: "pending" });

      try {
        const imageData = await FetchMaterials(searchQuery, page);
        const imagesHits = imageData.hits;
        this.setState(({ images }) => ({
          images: [...images, ...imagesHits],
          status: "resolved",
          totalHits: imageData.total,
        }));

        if (page > 1) {
          const CARD_HEIGHT = 300;
          window.scrollBy({
            top: CARD_HEIGHT * 2,
            behavior: "smooth",
          });
        }
      } catch (error) {
        toast.error(`Sorry something went wrong. ${error.message}`);
        this.setState({ status: "rejected" });
      }
    }
  }

  handleFormSubmit = (searchQuery) => {
    if (this.state.searchQuery === searchQuery) {
      return;
    }
    this.resetState();
    this.setState({ searchQuery });
  };

  handleSelectedImage = (largeImageUrl, tags) => {
    this.setState({
      selectedImage: largeImageUrl,
      alt: tags,
    });
  };

  resetState = () => {
    this.setState({
      searchQuery: "",
      page: 1,
      images: [],
      selectedImage: null,
      alt: null,
      status: "idle",
    });
  };

  loadMore = () => {
    this.setState((prevState) => ({
      page: prevState.page + 1,
    }));
  };

  closeModal = () => {
    this.setState({
      selectedImage: null,
    });
  };

  render() {
    const { images, status, selectedImage, alt, totalHits } = this.state;
    const showLoadMoreButton = images.length > 0 && images.length !== totalHits;
    return (
      <AppStyled>
        <Searchbar onSubmit={this.handleFormSubmit} />
        <ToastContainer autoClose={3000} theme="colored" pauseOnHover />
        {status === "pending" && <Loader />}
        <ImageGallery images={images} onImageClick={this.handleSelectedImage} />
        {selectedImage && (
          <CustomModal
            selectedImage={selectedImage}
            tags={alt}
            onClose={this.closeModal}
          />
        )}
        {showLoadMoreButton && <Button onClick={this.loadMore} />}
      </AppStyled>
    );
  }
}

export default App;