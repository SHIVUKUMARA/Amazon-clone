import React from 'react';
import "./footer.css";

const Footer = () => {

  const year = new Date().getFullYear();

  return (
    <footer>
       <div className='footer_container'>
        <div className='footer_details_one'>
            <h3>Get to Know US</h3>
            <p>About Us</p>
            <p>Careers</p>
            <p>press Releases</p>
            <p>Amazon Cares</p>
        </div>
        <div className='footer_details_one'>
            <h3>Connect with Us</h3>
            <p>Facebook</p>
            <p>Twitter</p>
            <p>Instagram</p>
        </div>
        <div className='footer_details_one forres'>
            <h3>Make Money with Us</h3>
            <p>Sell on Amazon</p>
            <p>Sell under Amazon Accelerator</p>
            <p>Protect and Build Your Brand</p>
            <p>Amazon Global Selling</p>
            <p>Become an Affiliate</p>
            <p>Fulfilment by Amazon</p>
            <p>Advertise Your Products</p>
            <p>Amazon Pay on Merchants</p>
        </div>
        <div className='footer_details_one forres'>
            <h3>Let Us Help You</h3>
            <p>COVID-19 and Amazon</p>
            <p>Your Account</p>
            <p>Returns Centre</p>
            <p>100% Purchase Protection</p>
            <p>Amazon App Download</p>
            <p>Help</p>
        </div>
       </div>
       <div className='lastdetails'>
        <img src="/images/amazon_PNG25.png" alt='logo' />
        <p id="info">Conditions of Use & Sale &nbsp; &nbsp; &nbsp; Privacy Notice &nbsp; &nbsp; &nbsp; 
        Interest-Based Ads &nbsp; &nbsp; &nbsp; © 1996-{year}, &nbsp; &nbsp; &nbsp;Amazon.com,&nbsp; &nbsp; &nbsp;
        Inc. or its affiliates</p>
       </div>
    </footer>
  )
}

export default Footer;
