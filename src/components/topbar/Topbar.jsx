import "./topbar.css";
import { useState } from "react";
import { Link } from "react-router-dom";

export default function Topbar() {
  const [userInfo, setUserInfo] = useState(JSON.parse(localStorage.getItem("userInfo")));
  return (
    <div className="topbarContainer">
      <div className="topbarLeft">
        <Link to="/" style={{ textDecoration: "none" }}>
          <span className="logo">Social Media</span>
        </Link>
      </div>
      <div className="topbarCenter">

      </div>
      <div className="topbarRight">
        <div className="topbarLinks">
        </div>
        <div className="topbarIcons">
          <div className="topbarIconItem">

          </div>
          <div className="topbarIconItem">

          </div>
          <div className="topbarIconItem">

          </div>
        </div>
        <Link to={`/profile/${userInfo.userName}`} style={{ textDecoration: "none" }}>
          <h2>{(userInfo.name)}</h2>
        </Link>
      </div>
    </div>
  );
}
