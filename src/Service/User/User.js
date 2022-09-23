import axios from "axios";
import { baseURL } from "../../baseUrl";

export const profileData =async (userName)=>{
  return await axios.get(`${baseURL}/user`,{params :{userName:userName}}).then((response) => {
        console.log(response);
        return response.data;
      });
}

