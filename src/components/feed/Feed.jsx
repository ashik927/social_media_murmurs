import Post from "../post/Post";
import Share from "../share/Share";
import "./feed.css";
import { Posts } from "../../dummyData";
import { useDispatch, useSelector } from "react-redux";
import ReactPaginate from 'react-paginate';
import { useState } from "react";
import { useEffect } from "react";
import { getAllPost, getUserPost } from "../../Service/Post/Post";
import { getPost } from "../../features/posts/postsSlice";
import { useLocation } from "react-router-dom";

export default function Feed({profileUserInfo}) {
  const Posts = useSelector((state) => state.posts);
  const dispatch = useDispatch();
  const location = useLocation()

  const [pageCount, setPageCount] = useState(0);
  const [limit, setLimit] = useState(10);
  const [offset, setOffset] = useState(0);
  const [toatlPost, setTotalPost] = useState(0);

  const handlePageClick = (event) => {
    console.log("handlePageClick",event.selected)
    setOffset((event.selected * limit) % toatlPost)
    // const newOffset = (event.selected * itemsPerPage) % items.length;
    // console.log(
    //   `User requested page number ${event.selected}, which is offset ${newOffset}`
    // );
    // setItemOffset(newOffset);
  };

  useEffect(()=>{

  },[Posts])

  useEffect(async()=>{
      var allPost;
      if(location.pathname.includes('profile')){
        allPost = await getUserPost(profileUserInfo?.id, limit , offset)
      }else{
        allPost =await getAllPost(limit , offset)
      }
       
      dispatch(getPost(allPost.data))
      setPageCount(Math.ceil(allPost.totalCount/limit))
      setTotalPost(allPost.totalCount)
      console.log("allPost", allPost)
  },[offset , profileUserInfo])

  return (
    <div className="feed">
      <div className="feedWrapper">
        <Share />
        {Posts?.map((p) => (
          <Post key={p.id} post={p} />
        ))}
      </div>
      <ReactPaginate
        breakLabel="..."
        nextLabel="next >"
        onPageChange={handlePageClick}
        pageRangeDisplayed={5}
        pageCount={pageCount}
        previousLabel="< previous"
        renderOnZeroPageCount={null}
        breakClassName={'page-item'}
        breakLinkClassName={'page-link'}
        containerClassName={'pagination'}
        pageClassName={'page-item'}
        pageLinkClassName={'page-link'}
        previousClassName={'page-item'}
        previousLinkClassName={'page-link'}
        nextClassName={'page-item'}
        nextLinkClassName={'page-link'}
        activeClassName={'active'}
      />
    </div>
  );
}
