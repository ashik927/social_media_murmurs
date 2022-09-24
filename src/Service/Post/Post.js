import axios from "axios";
import { baseURL } from "../../baseUrl";



export const postAdded = async (postObject) => {
      return await axios.post(`${baseURL}/me/murmurs`, postObject).then((response) => {
            console.log(response);
            return response.data;
      });
}

export const getAllPost = async (limit , offset) => {
      return await axios.get(`${baseURL}/murmurs`,{params : {limit:limit ,offset:offset}}).then((response) => {
            console.log(response);
            return response.data;
      });
}

export const getUserPost = async (id ,limit , offset) => {
      return await axios.get(`${baseURL}/murmurs/${id}`,{params : {limit:limit ,offset:offset}}).then((response) => {
            console.log(response);
            return response.data;
      });
}

