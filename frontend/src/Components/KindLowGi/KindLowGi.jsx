import React from 'react';
import { useNavigate } from 'react-router-dom';
import { assets } from '../../assets/assets';
import './KindLowGi.css';

export default function KindLowGi() {
  const navigate = useNavigate();

  const handleBuyNowClick = () => {
    navigate('/shop');
  };

  return (
    <section className="kind-lowgi-section">
      <div className="kind-lowgi-container">
        <div className="kind-lowgi-left">
          <img src={assets.bag} alt="Kind Low GI Rice" />
        </div>
        <div className="kind-lowgi-right">
          <div className="up-low-gi">
            <h2>Kind Low GI Rice</h2>
            <p>So Clean, So Tasty, So Healthy</p>
          </div>
          <div className="down-low-gi">
            <h2>From ₹210</h2>
            <p onClick={handleBuyNowClick} style={{ cursor: 'pointer' }}>Buy Now</p>
          </div>
        </div>
      </div>
    </section>
  );
}
