import React, { useState } from "react";
import "./signup.css";
import { NavLink } from "react-router-dom";
// (npm i react-tostify) is used to show user toast message instead of alert message
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const SignUp = () => {
  const [userData, setUserdata] = useState({
    fname: "",
    email: "",
    mobile: "",
    password: "",
    confirmpassword: "",
  });

  const addData = (e) => {
    const { name, value } = e.target;

    setUserdata(() => {
      return {
        ...userData,
        [name]: value,
      };
    });
  };

  const senddata = async(e) => {
    e.preventDefault();
    const {fname, email, mobile, password, confirmpassword} = userData;

    if(fname === ""){
      toast.warn("Provide your name",{
        position: "top-center",
        // hideProgressBar: true,
        autoClose: 1000,
      })
    } else if (email === ""){
      toast.warn("Provide E-mail",{
        position: "top-center",
        // hideProgressBar: true,
        autoClose: 1000,
      })
    }else if (mobile === ""){
      toast.warn("Provide mobile number",{
        position: "top-center",
        // hideProgressBar: true,
        autoClose: 1000,
      })
    }else if (password === ""){
      toast.warn("Provide password",{
        position: "top-center",
        // hideProgressBar: true,
        autoClose: 1000,
      })
    }else if (confirmpassword === ""){
      toast.warn("Provide confirmpassword",{
        position: "top-center",
        // hideProgressBar: true,
        autoClose: 1000,
      })
    }

    const res = await fetch("register", {
    method : "POST",
    headers:{
      "Content-Type" : "application/json"
    },
    body: JSON.stringify({
      fname, email, mobile, password, confirmpassword
    })
  });
  const data = await res.json();
  // console.log(data);
  if(res.status === 422 || !data){
    // alert("Please provide your information")
    toast.warn("Invalid details",{
      position: "top-center",
      autoClose: 1000,
    })
  } else {
    //  alert("Sign Up successfull")
    toast.success("Sign Up Successfull",{
    position: "top-center",
    autoClose: 1000,
  })
     setUserdata({...userData, fname : "", email : "", mobile : "", password : "", confirmpassword : "" });
    }
  }

  return (
    <div>
      <section>
        <div className="sign_container">
          <div className="sign_header">
            <img src="/images/blacklogoamazon.png" alt="logo" />
          </div>
          <div className="sign_form">
            <form method="POST">
              <h1>Sign-Up</h1>
              <div className="form_data">
                <label htmlFor="name">Your Name</label>
                <input
                  type="text"
                  onChange={addData}
                  value={userData.fname}
                  name="fname"
                  id="name"
                />
              </div>
              <div className="form_data">
                <label htmlFor="email">Email</label>
                <input
                  type="text"
                  onChange={addData}
                  value={userData.email}
                  name="email"
                  id="email"
                />
              </div>
              <div className="form_data">
                <label htmlFor="number">Ph No</label>
                <input
                  type="text"
                  onChange={addData}
                  value={userData.mobile}
                  name="mobile"
                  id="mobile"
                />
              </div>
              <div className="form_data">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  onChange={addData}
                  value={userData.password}
                  name="password"
                  id="password"
                />
              </div>
              <div className="form_data">
                <label htmlFor="password">Confirm Password</label>
                <input
                  type="password"
                  onChange={addData}
                  value={userData.confirmpassword}
                  name="confirmpassword"
                  id="password"
                />
              </div>
              <button className="signin_btn" onClick={senddata}>Continue</button>
              <div className="signin_info">
                <p>Already have an account?</p>
                <NavLink to="/login">Sign In</NavLink>
              </div>
            </form>
          </div>
          <ToastContainer />
        </div>
      </section>
    </div>
  );
};

export default SignUp;
