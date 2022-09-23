import axios from "axios";
import { baseURL } from "../../baseUrl";

export const login =async (userObject)=>{
  return await axios.post(`${baseURL}/login`,userObject).then((response) => {
        console.log(response);
        return response.data;
      });
}