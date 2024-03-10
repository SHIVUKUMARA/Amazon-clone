import React, { useEffect, useState, useContext } from "react";
import { Divider } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import "./cart.css";
import { LoginContext } from "../Context/ContextProvider";
import CircularProgress from '@mui/material/CircularProgress';


const Cart = () => {

  const {id} = useParams("");
  // console.log(id); 

  const history = useNavigate("");
  
  const {account, setAccount} = useContext(LoginContext);


  const [individualdata, setIndividualdata] = useState("");
  // console.log(individualdata);

  const getindividualdata = async() => {
    const res = await fetch(`/getproductsone/${id}`,{
      method: 'GET',
      headers:{
        "Content-Type":"application/json"
      }
    });
    const data = await res.json();
    // console.log(data);

    if(res.status !== 201){
      console.log("no data available");
    } else {
      console.log("getdata");
      setIndividualdata(data);
    }
  }
  
  useEffect(() => { 
    setTimeout(getindividualdata,1000)
  }, [id]);

  // add cart function
  const addtocart = async(id) =>{
    const checkres = await fetch(`/addcart/${id}`,{
      method: "POST",
      headers:{
        Accept:"application/json",
        "Content-Type": "application/json"
      },
      body:JSON.stringify({
        individualdata
      }),
    credentials:"include"
    });

    const data1 = await checkres.json();
    console.log(data1);

    if(checkres.status === 401 || !data1) {
      console.log("user invalid");
      alert("user invalid");
    } else {
      // alert("data added in your cart");
      history("/buynow");
      setAccount(data1);
    }
  }

  return (
    <div className="cart_section">
    {individualdata && Object.keys(individualdata).length && 
      <div className="cart_container">
        <div className="left_cart">
          <img
            src={individualdata.url}
            alt="cart_img"
          />
          <div className="cart_btn">
            <button className="cart_btn1" onClick={()=>addtocart(individualdata.id)}>Add to Cart</button>
            <button className="cart_btn2">Buy Now</button>
          </div>
        </div>
        <div className="right_cart">
            <h3>{individualdata.title.shortTitle}</h3>
            <h4>{individualdata.title.longTitle}</h4>
            <Divider />
            <p className="mrp">M.R.P : ₹{individualdata.price.mrp}</p>
            <p>Deal of the Day : <spam style={{color:"#B12704"}}>₹{individualdata.price.cost}</spam></p>
            <p>You save: <spam style={{color:"#B12704"}}>₹{individualdata.price.mrp - individualdata.price.cost} ({individualdata.price.discount})</spam></p>
            <div className="discount_box">
                <h5>Discount : <span style={{color:"#111"}}>{individualdata.discount}</span></h5>
                <h5 className="clo">Free Delivery : <span style={{color:"#111",fontWeight:600}}>Oct 8 - 21 </span> Details</h5>
                <p>Fastest Delivery:<span style={{color:"#111",fontWeight:600}}>Tomorrow 11AM</span></p>
            </div>
            <p className="description">About the Item : <span style={{color:"#565959", fontSize:14, fontWeight:500, letterSpacing:"0.4px"}}>
            {individualdata.description}</span></p>
        </div>
      </div>
    }
    {!individualdata ? 
    <div className='circle'>
          <CircularProgress />
          <h2>Loading....</h2>
      </div> : ""
    }
    </div>
    
  )
}

export default Cart;
