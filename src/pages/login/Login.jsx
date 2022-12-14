import { useState } from "react";
import "./login.css";
import swal from 'sweetalert';
import { Link, useNavigate } from "react-router-dom";
import { login } from "../../Service/AuthService/AuthService";
import { useDispatch } from "react-redux";
import { getAuth } from "../../features/Auth/authSlice";

export default function Login() {
  let navigate = useNavigate();
  const dispatch = useDispatch()
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  })

  const [validation, setValidation] = useState({
    email: false,
    password: false
  })

  const handleChange = (e) => {
    //destructing
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value
    })
    handleValidation()
  }

  const handleSubmit = async (e) => {
    console.log(formData)
    const validate = handleValidation()
    if (validate) {
      return
    } else {
      //call api
      const resValue = await login(formData)
      //check staus
      if (resValue.status === 200) {
        localStorage.setItem('userID', resValue.data.id)
        // debugger
        dispatch(getAuth(resValue.data))
        localStorage.setItem('userInfo', JSON.stringify(resValue.data))
        navigate("/");
      } else {
        // Failed Message
        swal({
          text: "Email Or Password Is Incorrect",
          title: "Login Failed",
          icon: "error",
        });
      }


      console.log("resValue", resValue)
    }
  }

  const handleValidation = () => {
    let value = false
    if (!formData.email) {
      setValidation({
        ...validation,
        email: true
      })
      value = true
    } else {
      setValidation({
        ...validation,
        email: false,
      })
    }
    if (!formData.password) {
      setValidation({
        ...validation,
        password: true
      })
      value = true
    } else {
      setValidation({
        ...validation,
        password: false,
      })
    }
    return value;
  }

  return (
    <div className="login">
      <div className="loginWrapper">
        <div className="loginLeft">
          <h3 className="loginLogo"></h3>
          <span className="loginDesc">
            Connect with friends and the world around you on SOCIAL MEDIA.
          </span>
        </div>
        <div className="loginRight">
         
          {
            validation.email &&
            <p style={{ color: 'red' }}>Please Input Email</p>
          }
          {
            validation.password &&
            <p style={{ color: 'red' }}>Please Input Password</p>
          }

          <div className="loginBox">
            <input placeholder="Email" className="loginInput" name="email" onChange={(e) => handleChange(e)} />
            <input placeholder="Password" className="loginInput" name="password" onChange={(e) => handleChange(e)} />
            <button className="loginButton" onClick={() => handleSubmit()}>Log In</button>
            {/* <span className="loginForgot">Forgot Password?</span> */}
            <Link to="/register">
              <button className="loginRegisterButton">
                Create a New Account
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
