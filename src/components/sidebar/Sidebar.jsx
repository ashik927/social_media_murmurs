import "./sidebar.css";
import {
  RssFeed,
  Chat,
  PlayCircleFilledOutlined,
  Group,
  Bookmark,
  HelpOutline,
  WorkOutline,
  Event,
  School,
} from "@material-ui/icons";

import { Users } from "../../dummyData";
import CloseFriend from "../closeFriend/CloseFriend";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getAllFollower } from "../../Service/Follow/Follow";

export default function Sidebar() {
  const navigate = useNavigate()
  const [allFollwer, setAllFollwer] = useState([])
  const handleLogOut = () => {
    localStorage.clear();
    navigate("/login")
  }
  useEffect(async () => {
    const allFollwerData = await getAllFollower(localStorage.getItem("userID"))
    setAllFollwer(allFollwerData.data)
    console.log("allFollwerData", allFollwerData)
  }, [])
  return (
    <div className="sidebar">
      <div className="sidebarWrapper">
        <ul className="sidebarList">
          <Link to="/" style={{ textDecoration: "none" , cursor:"pointer"}}>
            <li className="sidebarListItem">
              <RssFeed className="sidebarIcon" />
              <span className="sidebarListItemText">Feed</span>
            </li>
          </Link>
          {/* <li className="sidebarListItem">
            <Chat className="sidebarIcon" />
            <span className="sidebarListItemText">Chats</span>
          </li>
          <li className="sidebarListItem">
            <PlayCircleFilledOutlined className="sidebarIcon" />
            <span className="sidebarListItemText">Videos</span>
          </li> */}
          <Link to="/follow" style={{ textDecoration: "none", cursor:"pointer" }}>
            <li className="sidebarListItem">
              <Group className="sidebarIcon" />
              <span className="sidebarListItemText">Follower</span>
            </li>
          </Link>
          <Link to="/following" style={{ textDecoration: "none" , cursor:"pointer"}}>

            <li className="sidebarListItem">
              <Group className="sidebarIcon" />
              <span className="sidebarListItemText">Following</span>
            </li>
          </Link>
          <button style={{ color: '#ffffff', background: '#1877f2', padding: '5px', margin: '5px' }} onClick={() => handleLogOut()}>
            <span className="sidebarListItemText">Log Out</span>
          </button>
          {/* <li className="sidebarListItem">
            <Bookmark className="sidebarIcon" />
            <span className="sidebarListItemText">Bookmarks</span>
          </li>
          <li className="sidebarListItem">
            <HelpOutline className="sidebarIcon" />
            <span className="sidebarListItemText">Questions</span>
          </li>
          <li className="sidebarListItem">
            <WorkOutline className="sidebarIcon" />
            <span className="sidebarListItemText">Jobs</span>
          </li>
          <li className="sidebarListItem">
            <Event className="sidebarIcon" />
            <span className="sidebarListItemText">Events</span>
          </li>
          <li className="sidebarListItem">
            <School className="sidebarIcon" />
            <span className="sidebarListItemText">Courses</span>
          </li> */}
        </ul>
        {/* <button className="sidebarButton">Show More</button> */}
        <h4>Follower List</h4>
        <hr className="sidebarHr" />
        {
          allFollwer.length > 0 ? <ul className="sidebarFriendList">
            {Users.map((u) => (
              <CloseFriend key={u.id} user={u} />
            ))}
          </ul>
            :
            <p>No Follwer</p>
        }

      </div>

    </div>
  );
}
