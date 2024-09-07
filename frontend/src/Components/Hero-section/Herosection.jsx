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
            <h1><span>A low-GI Rice</span>
                <br />
                So Clean. So Tasty. So Healthy.
            </h1>
            <p>₹210 Onwards<br />
            <span className="btn" onClick={handleBuyNowClick}>Get Now</span></p>
          </div>
        </div>
      </div>
  
    </section>
  );
}
