import axios from "axios";
import { baseURL } from "../../baseUrl";



export const postAdded = async (postObject) => {
      return await axios.post(`${baseURL}/me/murmurs`, postObject).then((response) => {
            console.log(response);
            return response.data;
      });
}

export const getAllPost = async (postObject) => {
      return await axios.get(`${baseURL}/murmurs`).then((response) => {
            console.log(response);
            return response.data;
      });
}

export const getUserPost = async (id) => {
      return await axios.get(`${baseURL}/murmurs/${id}`).then((response) => {
            console.log(response);
            return response.data;
      });
}

