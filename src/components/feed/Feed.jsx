import Post from "../post/Post";
import Share from "../share/Share";
import "./feed.css";
import { Posts } from "../../dummyData";
import { useSelector } from "react-redux";

export default function Feed() {
  const Posts = useSelector((state) => state.posts);
  return (
    <div className="feed">
      <div className="feedWrapper">
        <Share />
        {Posts?.map((p) => (
          <Post key={p.id} post={p} />
        ))}
      </div>
    </div>
  );
}
