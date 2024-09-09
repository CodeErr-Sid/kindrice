import React from 'react';
import { useNavigate } from 'react-router-dom';
import './KindLowGI.css';

export default function KindLowGi({ imageSrc, title, description, price,style }) {
  const navigate = useNavigate();

  const handleBuyNowClick = () => {
    navigate('/shop');
  };

  return (
    <section className="kind-lowgi-section" style={style}>
      <div className="kind-lowgi-container">
        <div className="kind-lowgi-left">
          <img src={imageSrc} alt={title} />
        </div>
        <div className="kind-lowgi-right">
          <div className="up-low-gi">
            <h2>{title}</h2>
            <p>{description}</p>
          </div>
          <div className="down-low-gi">
            <h2>{price}</h2>
            <p onClick={handleBuyNowClick} style={{ cursor: 'pointer' }}>Buy Now</p>
          </div>
        </div>
      </div>
    </section>
  );
}
