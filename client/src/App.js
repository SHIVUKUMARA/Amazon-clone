import React, { useState, useEffect } from 'react';
import {Routes, Route} from "react-router-dom";
import './App.css';
import Navbar from './Components/Header/Navbar';
import Newnav from './Components/newnavbar/Newnav';
import Maincomponent from './Components/Home/Maincomponent';
import Footer from './Components/Footer/Footer';
import SignUp from './Components/Signup_sign/SignUp';
import Sign_in from './Components/Signup_sign/Sign_in';
import Cart from './Components/Cart/Cart';
import Buynow from './Components/Buynow/Buynow';
import CircularProgress from '@mui/material/CircularProgress';

function App() {

  const [data, setData] = useState(false);
  
  useEffect(() =>{
    setTimeout(()=>{
      setData(true)
    }, 2000)
  },[])

  return (
    <>
    {
      data ? (
        <>
      <Navbar />
      <Newnav />
      <Routes>
      <Route path="/" element={<Maincomponent />} />
      <Route path="/login" element={<Sign_in />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/getproductsone/:id" element={<Cart />} />
      <Route path="/buynow" element={<Buynow />} />
      </Routes>
      <Footer />
        </>
      ) : (
        <div className='circle'>
          <CircularProgress />
          <h2>Loading....</h2>
        </div>
      )
    }
      
    </>
  );
}

export default App;


