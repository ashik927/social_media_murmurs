import "./profile.css";
import Topbar from "../../components/topbar/Topbar";
import Sidebar from "../../components/sidebar/Sidebar";
import Feed from "../../components/feed/Feed";
import Rightbar from "../../components/rightbar/Rightbar";
import { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { profileData } from "../../Service/User/User";
import { getUserPost } from "../../Service/Post/Post";
import { useDispatch } from "react-redux";
import { getPost } from "../../features/posts/postsSlice";
import { addFollow, getUserFollow, removeFollow } from "../../Service/Follow/Follow";

export default function Profile() {
  const [profileUserInfo, setProfileUserInfo] = useState()
  const [isFollow, setIsFollow] = useState(false)
  const [followID, setFollowID] = useState(false)

  const { userName } = useParams()
  const dispatch = useDispatch();

  useEffect(async () => {
    const getProfileData = await profileData(userName)
    if (getProfileData) {
      setProfileUserInfo(getProfileData.data)
      // const allPost = await getUserPost(getProfileData?.data?.id)
      // dispatch(getPost(allPost?.data))
      const checkFollow = await getUserFollow(localStorage.getItem("userID") , getProfileData?.data?.id )
      if (checkFollow?.data?.length > 0) {
        setIsFollow(true)
        setFollowID(checkFollow?.data[0]?.id)
      }
    }
  }, [])

  const follow = (userID, followUserID) => {
    if(!isFollow){
      addFollow(userID, followUserID)
    }else{
      removeFollow(followID)
    }
    setIsFollow(!isFollow)
    
  }

  return (
    <>
      <Topbar />
      <div className="profile">
        <Sidebar />
        <div className="profileRight">
          <div className="profileRightTop">
            <div className="profileCover">
              <img
                className="profileCoverImg"
                src="../assets/post/3.jpeg"
                alt=""
              />
              <img
                className="profileUserImg"
                src="../assets/defaultPicture.png"
                alt=""
              />
            </div>
            <div className="profileInfo">
              <h4 className="profileInfoName">{profileUserInfo?.name}</h4>
              {
                profileUserInfo?.id == localStorage.getItem("userID") ? "" :
                  isFollow ?
                  <button style={{ backgroundColor: "#1877f2", padding: "10px", marginBottom: "10px", cursor: 'pointer', borderRadius: "10px" }} onClick={() => follow(localStorage.getItem("userID"), profileUserInfo?.id)}> UnFollow</button>
                  :
                  <button style={{ backgroundColor: "#1877f2", padding: "10px", marginBottom: "10px", cursor: 'pointer', borderRadius: "10px" }} onClick={() => follow(localStorage.getItem("userID"), profileUserInfo?.id)}> Follow</button>

              }
              <span className="profileInfoDesc">Hello my friends!</span>
            </div>
          </div>
          <div className="profileRightBottom">
            <Feed profileUserInfo={profileUserInfo}/>
            {/* <Rightbar profile/> */}
          </div>
        </div>
      </div>
    </>
  );
}
