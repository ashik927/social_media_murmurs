import axios from "axios";
import { baseURL } from "../../baseUrl";

export const getUserFollow = async (userID, followUserID) => {
    return await axios.get(`${baseURL}/me/following`, { params: { userID: userID, followUserID: followUserID } }).then((response) => {
        console.log(response);
        return response.data;
    });
}

export const addFollow = async (userID, followUserID) => {
    return await axios.post(`${baseURL}/me/follow`, { userID: userID, followUserID: followUserID }).then((response) => {
        console.log(response);
        return response.data;
    });
}

export const removeFollow = async (id) => {
    return await axios.delete(`${baseURL}/me/follow/${id}`).then((response) => {
        return response.data;
    });
}