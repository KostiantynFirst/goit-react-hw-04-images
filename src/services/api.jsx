import axios from "axios";

export const FetchMaterials = async (searchQuery, page) => {

const API_KEY = "38387021-e8462f34030ce37ed84fa82f8";
axios.defaults.baseURL = 'https://pixabay.com/api/';
    
try {
      const res = await axios.get(
        `?q=${searchQuery}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`
      );
     return res.data;
      }  
    catch (error) {
      throw error;
  }
}