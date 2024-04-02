import React, { useContext, useEffect, useState } from "react";
import "./navbar.css";
import { NavLink, useNavigate } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";
import Badge from "@mui/material/Badge";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Drawer from "@mui/material/Drawer";
import { LoginContext } from "../Context/ContextProvider";
import Rightheader from "./Rightheader";
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import LogoutIcon from '@mui/icons-material/Logout';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useSelector } from "react-redux";

const Navbar = () => {
  const { account, setAccount } = useContext(LoginContext);
  // console.log(account);

  const history = useNavigate();
   
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const [text,setText] = useState("");
  console.log(text);
  const [liopen, setLiopen] = useState(true);

  const {products} = useSelector(state =>state.getproductsdata);

  const [dropen, setDropen] = useState(false);

  const getdetailvaliduser = async () => {
    const res = await fetch("/validuser", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
    const data = await res.json();
    // console.log(data);

    if (res.status !== 201) {
      console.log("error");
    } else {
      console.log("data valid");
      setAccount(data);
    }
  };

  const handleopen = () => {
    setDropen(true)
  }

  const handledrclose = () => {
    setDropen(false)
  }

  const logoutuser = async () => {
    const res2 = await fetch("/logout", {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
    const data2 = await res2.json();
    // console.log(data2);

    if (res2.status !== 201) {
      console.log("error");
    } else {
      console.log("loged out");
      // alert("logout");
      toast.success("logout successfull",{
        position: "top-center",
        autoClose: 1000,
      })
      history("/");
      setAccount(false);
    }
  };

  const getText = (items) =>{
    setText(items)
    setLiopen(false)
  }

  useEffect(() => {
    getdetailvaliduser();
  }, []);

  return (
    <header>
      <nav>
        <div className="left">
          <IconButton
            className="hamburgur" onClick={handleopen}
            // size="large"
            // edge="start"
            // color="inherit"
            // aria-label="menu"
            // sx={{ mr: 2 }}
          >
            <MenuIcon style={{ color: "#fff" }} />
          </IconButton>
          <Drawer open={dropen} onClose={handledrclose}>
            <Rightheader logclose={handledrclose} logoutuser={logoutuser}/>
          </Drawer>
          <div className="navlogo">
            <NavLink to="/">
              <img src="/images/amazon_PNG25.png" alt="" />
            </NavLink>
          </div>
          <div className="nav_searchbar">
            <input type="text" name="" id="" 
              placeholder='Search for products'
              onChange={(e)=>getText(e.target.value)}
            />
            <div className="search_icon">
              <SearchIcon id="search" />
            </div>
            {/*search filter */}
            {
              text && 
              <List className="extrasearch" hidden={liopen}>
                {
                  products.filter(product =>product.title.longTitle.toLowerCase().includes(text.toLowerCase())).map(product => (
                  <ListItem>
                    <NavLink to={`/getproductsone/${product.id}`} onClick={()=> setLiopen(true)}>
                    {product.title.longTitle}
                    </NavLink>
                  </ListItem>
                  ))
                }
              </List>
            }
          </div>
        </div>
        <div className="right">
          <div className="nav_btn">
            <NavLink to="/login">Sign In</NavLink>
          </div>
          <div className="cart_btn">
            {account ? (
              <NavLink to="/buynow">
                <Badge badgeContent={account.carts.length} color="primary">
                  <ShoppingCartIcon id="icon" />
                </Badge>
              </NavLink>
            ) : (
              <NavLink to="/login">
                <Badge badgeContent={0} color="primary">
                  <ShoppingCartIcon id="icon" />
                </Badge>
              </NavLink>
            )}
            <ToastContainer />
            <p>Cart</p>
          </div>
          {
            account ? <Avatar className="avatar2"
            id="basic-button"
             aria-controls={open ? 'basic-menu' : undefined}
             aria-haspopup="true"
             aria-expanded={open ? 'true' : undefined}
             onClick={handleClick}
             >
             {account.fname[0].toUpperCase()}
             </Avatar> : <Avatar className="avatar" 
             id="basic-button"
             aria-controls={open ? 'basic-menu' : undefined}
             aria-haspopup="true"
             aria-expanded={open ? 'true' : undefined}
             onClick={handleClick}     
            />
          }
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem onClick={handleClose}>My account</MenuItem>
        {
          account ? <MenuItem  onClick={logoutuser}>Logout <LogoutIcon style={{fontSize:16, marginLeft:5}}/></MenuItem> : ""
        }
        
      </Menu>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
