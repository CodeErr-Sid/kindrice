import React from 'react';
import { useNavigate } from 'react-router-dom'; 
import { assets } from '../../assets/assets';
import './Herosection.css';

export default function Herosection() {
  const navigate = useNavigate(); 
  

  const handleBuyNowClick = () => {
    navigate('/shop'); 
  };

  return (
    <section className='hero-section'>
      <div className="background-outer-layer">
        <div className="inner-layer">
          <div className="assets">
            <img src={assets.outdoor} alt='' />
          </div>
          <div className="content-overlay">
            <h1>Kind <span>low-GI</span> Rice
                <br />
                So Clean. So Tasty. So Healthy.
            </h1>
            <p>From ₹210<br />
            <span className="btn" onClick={handleBuyNowClick}>Buy Now</span></p>
          </div>
        </div>
      </div>
      <div className='second-section'>
        <img src={assets.Home2} alt='home2' />
      </div>
    </section>
  );
}
