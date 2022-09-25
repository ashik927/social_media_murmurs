import "./profile.css";
import Topbar from "../../components/topbar/Topbar";
import Sidebar from "../../components/sidebar/Sidebar";
import Feed from "../../components/feed/Feed";
import { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { profileData } from "../../Service/User/User";
import { addFollow, getUserFollow, removeFollow } from "../../Service/Follow/Follow";

export default function Profile() {
  const [profileUserInfo, setProfileUserInfo] = useState()
  const [isFollow, setIsFollow] = useState(false)
  const [followID, setFollowID] = useState(false)
  const [myProfileInfo, setMyProfileInfo] = useState()
  const [follwoingCount, setFollwoingCount] = useState()
  const [follwerCount, setFollowerCount] = useState()

  const { userName } = useParams()

  useEffect(async () => {
    const data = JSON.parse(localStorage.getItem('userInfo'))
    const getProfileData = await profileData(userName)
    const getMyProfileData = await profileData(data?.userName)
    if (getMyProfileData) {
      setMyProfileInfo(getMyProfileData?.data)
    }

    if (getProfileData) {
      setProfileUserInfo(getProfileData?.data)
      setFollwoingCount(getProfileData?.data?.followingCount)
      setFollowerCount(getProfileData?.data?.followerCount)

      const checkFollow = await getUserFollow(localStorage.getItem("userID"), getProfileData?.data?.id)
      if (checkFollow?.data?.length > 0) {
        setIsFollow(true)
        setFollowID(checkFollow?.data[0]?.id)
      }
    }
  }, [])

  const follow = (userID, followUserID, myFollwoing, userFollower) => {
    if (!isFollow) {
      setFollowerCount(follwerCount + 1)
      addFollow(userID, followUserID, myFollwoing, userFollower)
    } else {
      setFollowerCount(follwerCount - 1)
      removeFollow(followID, userID, followUserID, myProfileInfo.followingCount, profileUserInfo.followerCount)
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
                    <button style={{ backgroundColor: "#1877f2", padding: "10px", marginBottom: "10px", cursor: 'pointer', borderRadius: "10px" }} onClick={() => follow(localStorage.getItem("userID"), profileUserInfo?.id, myProfileInfo.followingCount, profileUserInfo.followerCount)}> Follow</button>

              }
              <span className="profileInfoDesc">Following : {follwoingCount} </span>
              <span className="profileInfoDesc">Follower : {follwerCount} </span>

              <span className="profileInfoDesc">Hello my friends!</span>
            </div>
          </div>
          <div className="profileRightBottom">
            <Feed profileUserInfo={profileUserInfo} />
          </div>
        </div>
      </div>
    </>
  );
}
