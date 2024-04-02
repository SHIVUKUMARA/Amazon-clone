import React, { useEffect } from 'react';
import Banner from './Banner';
import "./home.css";
import Slide from './Slide';
import { getProducts } from '../Redux/Actions/Action';
import {useDispatch, useSelector} from "react-redux";

const Maincomponent = () => {

  const {products} = useSelector(state => state.getproductsdata);
  console.log(products);
  
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProducts());
  },[dispatch]);

  return (
    <div className="home_section">
        <div className="banner_part">
            <Banner />
        </div>
        <div className="slide_part">
          <div className='left_slide'>
            <Slide title="Deal of The Day"  products={products} />
          </div>
          <div className='right_slide'>
            <h4>Festive latest launches</h4>
            <img src="https://images-eu.ssl-images-amazon.com/images/G/31/Events/img23/Jupiter23/Homepage/PC_CC_Event_1X_EN._SY304_CB576157745_.jpg" 
            alt="festival image" />
            <a href="#">See more</a>
          </div>
        </div>
        <Slide title="Today's Deal" products={products} />
        <div className='center_img'>
          <img src="https://images-eu.ssl-images-amazon.com/images/G/31/img23/AmazonPay/Jupiter23/Event/Train_GW_editorial_2300x646._CB575880778_.jpg" alt="" />
        </div>
        <Slide title="Best Seller"  products={products} />
        <Slide title="Upto 80% off" products={products} />
    </div>
  )
}

export default Maincomponent;
