import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Tagline.css';

export default function Tagline() {
  const navigate = useNavigate();

  const handleBuyClick = () => {
    navigate('/shop');
  };

  return (
    <section className='lowgi-tagline-section'>
      <div className='tagline-container'>
        <div className="tagline-container-up">
          <h1>Kind low-GI rice</h1>
          <p>So Clean. So Tastly. So Healthy.</p>
        </div>
        <div className="tagline-container-down">
          <p className='tag-one'>From ₹159</p>
          <p className='tag-two' onClick={handleBuyClick} style={{ cursor: 'pointer' }}>
            Buy &gt;
          </p>
        </div>
      </div>
    </section>
  );
}
