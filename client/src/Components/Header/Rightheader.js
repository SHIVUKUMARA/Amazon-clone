import React, { useContext } from "react";
import Avatar from "@mui/material/Avatar";
import { LoginContext } from "../Context/ContextProvider";
import { NavLink } from "react-router-dom";
import { Divider } from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import "./rightheader.css";

const Rightheader = ({ logclose, logoutuser }) => {
  const { account, setAccount } = useContext(LoginContext);

  return (
    <>
      <div className="rightheader">
        <div className="right_nav">
          {account ? (
            <Avatar className="avatar2">
              {account.fname[0].toUpperCase()}
            </Avatar>
          ) : (
            <Avatar className="avatar"></Avatar>
          )}
          {account ? <h3>Hello, {account.fname.toUpperCase()}</h3> : ""}
        </div>
        <div className="nav_btn" onClick={() => logclose()}>
          <NavLink to="/">Home</NavLink>
          <NavLink to="/">Shop By Category</NavLink>

          <Divider style={{ width: "100%", marginLeft: "-20px" }} />

          <NavLink to="/">Today's Deal</NavLink>
          {account ? (
            <NavLink to="/buynow">Your Orders</NavLink>
          ) : (
            <NavLink to="/login">Your Orders</NavLink>
          )}

          <Divider style={{ width: "100%", marginLeft: "-20px" }} />

          <div className="flag">
            <NavLink to="/">Settings</NavLink>
            <img
              src="/images/india.png"
              style={{ width: 35, marginLeft: 10 }}
              alt="flag"
            />
          </div>
          {account ? (
            <div className="flag">
              <h3
                onClick={() => logoutuser()}
                style={{ cursor: "pointer", fontWeight: 500 }}
              >
                Logout &nbsp;
              </h3>
              <LogoutIcon style={{ fontSize: 18, marginRight: 14 }} />
            </div>
          ) : (
            <NavLink to="/login">SignIn</NavLink>
          )}
        </div>
      </div>
    </>
  );
};

export default Rightheader;
