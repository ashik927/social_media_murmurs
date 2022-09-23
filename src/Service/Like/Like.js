import axios from "axios";
import { baseURL } from "../../baseUrl";



export const addLike =async (likeObject)=>{
    return await axios.post(`${baseURL}/me/like`,likeObject).then((response) => {
          console.log(response);
          return response.data;
        });
  }
  export const checkLiked =async (userID , postID)=>{
    return await axios.get(`${baseURL}/me/like`,{params :{userID:userID ,postID:postID}}).then((response) => {
          console.log(response);
          return response.data;
        });
  }

  export const removeLiked =async (likeID , postID , likeCount)=>{
    return await axios.delete(`${baseURL}/me/like/${likeID}`,{params :{postID:postID ,likeCount:likeCount}}).then((response) => {
          console.log(response);
          return response.data;
        });
  }