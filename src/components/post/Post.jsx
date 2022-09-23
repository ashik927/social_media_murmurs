import "./post.css";
import { MoreVert } from "@material-ui/icons";
import { Users } from "../../dummyData";
import { useState } from "react";
import { addLike, checkLiked, removeLiked } from "../../Service/Like/Like";
import { useEffect } from "react";
import { Link } from "react-router-dom";

export default function Post({ post }) {
  const [like, setLike] = useState(post.likeCount)
  const [isLiked, setIsLiked] = useState(false)
  const [myID, setMyID] = useState(localStorage.getItem('userID'))

  const [likeID, setLikeID] = useState()

  const likeHandler = (myID, postID, likeCount) => {
    setLike(isLiked ? like - 1 : like + 1)
    setIsLiked(!isLiked)
    const likeObject = {
      "userID": myID,
      "postID": postID,
      "likeCount": likeCount
    }
    if (isLiked) {
      removeLiked(likeID, postID, likeCount)
    } else {
      addLike(likeObject)
    }
  }

  useEffect(async () => {
    if (post) {
      const checkLike = await checkLiked(myID, post.id)
      if (checkLike.data.length > 0) {
        setIsLiked(true)
        setLikeID(checkLike.data[0].id)
      }
    }

  }, [post])



  return (
    <div className="post">
      <div className="postWrapper">
        <div className="postTop">
          <div className="postTopLeft">
            <img
              className="postProfileImg"
              src="../assets/defaultPicture.png"
              alt=""
            />
            <Link to={`/profile/${post.userName}`} style={{textDecoration:'none'}}>
              <span className="postUsername">
                {post.name}
                {/* {Users.filter((u) => u.id === post?.userId)[0].username} */}
              </span>
            </Link>
            <span className="postDate">{post?.created_at?.split('T')[0]}</span>
          </div>
          <div className="postTopRight">
            <MoreVert />
          </div>
        </div>
        <div className="postCenter">
          <span className="postText">{post?.murmur}</span>
          {/* <img className="postImg" src={post.photo} alt="" /> */}
        </div>
        <div className="postBottom">
          <div className="postBottomLeft">
            {
              isLiked ? <img className="likeIcon" src="../assets/liked.png" onClick={() => likeHandler(myID, post.id, post.likeCount)} alt="" />
                :
                <img className="likeIcon" src="../assets/like.png" onClick={() => likeHandler(myID, post.id, post.likeCount)} alt="" />
            }

            {/* <img className="likeIcon" src="assets/heart.png" onClick={likeHandler} alt="" /> */}
            <span className="postLikeCounter">{like} people like it</span>
          </div>
          {/* <div className="postBottomRight">
            <span className="postCommentText">{post.comment} comments</span>
          </div> */}
        </div>
      </div>
    </div>
  );
}
