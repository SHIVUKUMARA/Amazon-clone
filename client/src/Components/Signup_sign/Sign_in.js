import React, { useState, useContext } from "react";
import "./signup.css";
import { NavLink } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { LoginContext } from "../Context/ContextProvider";

const Sign_in = () => {
  const [logData, setData] = useState({
    email: "",
    password: "",
  });
  console.log(logData);

  const [showPassword, setShowPassword] = useState(false);
  const { account, setAccount } = useContext(LoginContext);

  const addData = (e) => {
    const { name, value } = e.target;

    setData(() => {
      return {
        ...logData,
        [name]: value,
      };
    });
  };
 
  const senddata = async (e) => {
    e.preventDefault();

    const { email, password } = logData;

    const res = await fetch("/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });

    const data = await res.json();
    console.log(data);

    if (res.status === 400 || !data) {
      console.log("invalid details");
      toast.warn("Invalid details", {
        position: "top-center",
        autoClose: 1000,
      });
    } else {
      console.log("data valid");
      setAccount(data);
      toast.success("User valid", {
        position: "top-center",
        autoClose: 1000,
      });
      setData({ ...logData, email: "", password: "" });
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };


  return (
    <>
      <section>
        <div className="sign_container">
          <div className="sign_header">
            <img src="/images/blacklogoamazon.png" alt="logo" />
          </div>
          <div className="sign_form">
            <form method="POST">
              <h1>Sign-In</h1>
              <div className="form_data">
                <label htmlFor="email">Email</label>
                <input
                  type="text"
                  onChange={addData}
                  value={logData.email}
                  name="email"
                  id="email"
                />
              </div>
              <div className="form_data">
                <label htmlFor="password">Password</label>
                <input
                  type={showPassword ? "text" : "password"}
                  onChange={addData}
                  value={logData.password}
                  name="password"
                  placeholder="Atleast 8 character"
                  id="password"
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="toggle-password-btn"
                >
                  {showPassword ? "Hide" : "Show"} Password
                </button> 
              </div>
              {/* {senddata ? (
            <NavLink to="/">
                <button className="signin_btn" onClick={senddata}>Continue</button>
            </NavLink>
          ) : (
            <NavLink t0="/login"></NavLink>
          )} */}
              <button className="signin_btn" onClick={senddata}>
                Continue
              </button>
            </form>
          </div>
          <div className="create_accountinfo">
            <p>New To Amazon</p>
            <NavLink to="/signup">
              <button>Create Your Amazon Account</button>
            </NavLink>
          </div>
        </div>
        <ToastContainer />
      </section>
    </>
  );
};

export default Sign_in;
