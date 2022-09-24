import Topbar from "../../components/topbar/Topbar";
import Sidebar from "../../components/sidebar/Sidebar";
import Feed from "../../components/feed/Feed";
import Rightbar from "../../components/rightbar/Rightbar";
import "./home.css"
import { useEffect, useState } from "react";
import { getAllPost } from "../../Service/Post/Post";
import { useDispatch, useSelector } from "react-redux";
import { getPost } from "../../features/posts/postsSlice";

export default function Home() {
  // const dispatch = useDispatch();
  // const [postCount , setPageCount] = useState();
  // useEffect(async()=>{
  //     const allPost =await getAllPost()
  //     dispatch(getPost(allPost.data))
  //     setPageCount(allPost.totalCount)
  //     console.log("allPost", allPost)
  // },[dispatch])
  return (
    <>
      <Topbar />
      <div className="homeContainer">
        <Sidebar />
        <Feed />
        {/* <Rightbar/> */}
      </div>
    </>
  );
}
