import "./share.css";
import { useState } from "react";
import { postAdded } from "../../Service/Post/Post";
import swal from 'sweetalert';
import { useDispatch } from "react-redux";
import { addPost } from "../../features/posts/postsSlice";

export default function Share() {
  const [userInfo, setUserInfo] = useState(JSON.parse(localStorage.getItem("userInfo")));
  const [murmurs, setMurmurs] = useState(false)
  const dispatch = useDispatch()
  const [formData, setFormData] = useState({
    murmur: "",
    userID: localStorage.getItem("userID"),
    likeCount: 0
  })

  const handleChange = (e) => {
    //destructing
    const { name, value } = e.target
    setMurmurs(false)
    setFormData({
      ...formData,
      [name]: value
    })
  }

  const handleSubmit = async (e) => {
    if (!formData.murmur) {
      setMurmurs(true)
      return
    } else {
      //call api
      const resValue = await postAdded(formData)
      //redux value
      formData.name = userInfo.name
      formData.userName = userInfo.userName
      dispatch(addPost(formData))
      //check staus
      if (resValue.status === 200) {
        swal({
          // text: "Network Error",
          title: "Post Added",
          icon: "success",
        });
      } else {
        // Failed Message
        swal({
          text: "Network Error",
          title: "Post Failed",
          icon: "error",
        });
      }


      console.log("resValue", resValue)
    }
  }

  return (
    <div className="share">
      <div className="shareWrapper">
        <div className="shareTop">
          {
            murmurs && <p style={{ color: 'red' }}>Please Write Something</p>

          }
          <img className="shareProfileImg" src="/assets/defaultPicture.png" alt="" />
          <input
            placeholder={`What's in your mind ${userInfo.name}?`}
            className="shareInput"
            name="murmur"
            onChange={(e) => handleChange(e)}
          />
        </div>
        <hr className="shareHr" />
        <div className="shareBottom">
          <div className="shareOptions">

          </div>
          <button className="shareButton" onClick={() => handleSubmit()}>Post</button>
        </div>
      </div>
    </div>
  );
}
