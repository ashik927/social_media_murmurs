import { useState } from "react";
import { Link } from "react-router-dom";
import { register } from "../../Service/AuthService/AuthService";
import "./register.css";
import swal from 'sweetalert';

export default function Register() {

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: ""
  })

  const [validation, setValidation] = useState({
    name: false,
    email: false,
    password: false
  })
  const handleChange = (e) => {
    //destructing
    const { name, value } = e.target
    // set data local state 
    setFormData({
      ...formData,
      [name]: value
    })
    handleValidation()
  }

  const handleValidation = () => {
    let value = false
    if (!formData.name) {
      setValidation({
        ...validation,
        name: true
      })
      value = true
    } else {
      setValidation({
        ...validation,
        name: false,
      })
    }
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

  const handleSubmit = async (e) => {
    console.log(formData)
    const validate = handleValidation()
    if (validate) {
      return
    } else {
      //call api
      const resValue = await register(formData)
      //check staus
      if (resValue.status === 200) {
        swal({
          text: resValue.message,
          title: "Register Successful",
          icon: "success",
        });

      } else {
        // Failed Message
        swal({
          text: resValue.message,
          title: "Register Failed",
          icon: "error",
        });
      }


      console.log("resValue", resValue)
    }
  }
  return (
    <div className="login">
      <div className="loginWrapper">
        <div className="loginLeft">
          <h3 className="loginLogo">SOCIAL MEDIA</h3>
          <span className="loginDesc">
            Connect with friends and the world around you on SOCIAL MEDIA.
          </span>
        </div>
        <div className="loginRight">
          {
            validation.name &&
            <p style={{ color: 'red' }}>Please Input Name</p>
          }
          {
            validation.email &&
            <p style={{ color: 'red' }}>Please Input Email</p>
          }
          {
            validation.password &&
            <p style={{ color: 'red' }}>Please Input Password</p>
          }

          <div className="loginBox">
            <input placeholder="Username" className="loginInput" name="name" onChange={(e) => handleChange(e)} />
            <input placeholder="Email" className="loginInput" name="email" onChange={(e) => handleChange(e)} />
            <input placeholder="Password" className="loginInput" name="password" onChange={(e) => handleChange(e)} />
            {/* <input placeholder="Password Again" className="loginInput" /> */}
            <button className="loginButton" onClick={() => handleSubmit()}>Sign Up</button>
            <Link to="/login">
              <button className="loginRegisterButton">
                Log into Account
              </button>
            </Link>

          </div>
        </div>
      </div>
    </div>
  );
}
