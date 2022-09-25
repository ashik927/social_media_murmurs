import "./sidebar.css";
import {
  RssFeed,
  Group,
} from "@material-ui/icons";

import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { profileData } from "../../Service/User/User";

export default function Sidebar() {
  const navigate = useNavigate()
  const [myProfileInfo, setMyProfileInfo] = useState()
  const [allFollwer, setAllFollwer] = useState([])
  const handleLogOut = () => {
    localStorage.clear();
    navigate("/login")
  }
  useEffect(async () => {
    const data = JSON.parse(localStorage.getItem('userInfo'))
    const getMyProfileData = await profileData(data.userName)
    if (getMyProfileData) {
      setMyProfileInfo(getMyProfileData.data)
    }
  }, [])
  return (
    <div className="sidebar">
      <div className="sidebarWrapper">
        <ul className="sidebarList">
          <Link to="/" style={{ textDecoration: "none", cursor: "pointer" }}>
            <li className="sidebarListItem">
              <RssFeed className="sidebarIcon" />
              <span className="sidebarListItemText">Feed</span>
            </li>
          </Link>

          <Link to="/follow" style={{ textDecoration: "none", cursor: "pointer" }}>
            <li className="sidebarListItem">
              <Group className="sidebarIcon" />
              <span className="sidebarListItemText">Follower ({myProfileInfo?.followerCount}) </span>
            </li>
          </Link>
          <Link to="/following" style={{ textDecoration: "none", cursor: "pointer" }}>

            <li className="sidebarListItem">
              <Group className="sidebarIcon" />
              <span className="sidebarListItemText">Following ({myProfileInfo?.followingCount})</span>
            </li>
          </Link>
          <button style={{ color: '#ffffff', background: '#1877f2', padding: '5px', margin: '5px' }} onClick={() => handleLogOut()}>
            <span className="sidebarListItemText">Log Out</span>
          </button>

        </ul>

      </div>

    </div>
  );
}
