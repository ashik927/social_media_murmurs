import axios from "axios";
import { baseURL } from "../../baseUrl";

export const getUserFollow = async (userID, followUserID) => {
    return await axios.get(`${baseURL}/me/following`, { params: { userID: userID, followUserID: followUserID } }).then((response) => {
        console.log(response);
        return response.data;
    });
}

export const addFollow = async (userID, followUserID , myfollowingCount , userFollowerCount) => {
    return await axios.post(`${baseURL}/me/follow`, { userID: userID, followUserID: followUserID , myfollowingCount:myfollowingCount , userFollowerCount:userFollowerCount}).then((response) => {
        console.log(response);
        return response.data;
    });
}

export const getAllFollower = async (userID) => {
    return await axios.get(`${baseURL}/me/follows/${userID}`).then((response) => {
        console.log(response);
        return response.data;
    });
}

export const getAllFollowing = async (userID) => {
    return await axios.get(`${baseURL}/me/following/${userID}`).then((response) => {
        console.log(response);
        return response.data;
    });
}

export const removeFollow = async (id , userID , followUserID , myfollowingCount , userFollowerCount) => {
    return await axios.delete(`${baseURL}/me/follow/${id}`,{params:{ userID: userID, followUserID: followUserID , myfollowingCount:myfollowingCount , userFollowerCount:userFollowerCount}}).then((response) => {
        return response.data;
    });
}