import { Link } from "react-router-dom";
import "./online.css";

export default function Online({user,index}) {
  return (
    <li className="rightbarFriend">
      <div className="rightbarProfileImgContainer">
        {/* <img className="rightbarProfileImg" src={user.profilePicture} alt="" /> */}
        {/* <span className="rightbarOnline"></span> */}
        {index+1} .
      </div>
      <Link to={`/profile/${user.userName}`} style={{textDecoration:"none"}}>
      <span className="rightbarUsername">{user.name}</span>
      </Link>
    </li>
  );
}
