import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './KindLowGI.css';
import { ArrowRight } from 'lucide-react';


export default function KindLowGi({ imageSrc, title, description, price, style }) {
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
            {/* Wrapping Link around the button */}
            <Link to="/shop">
              <button className="bg-green-800 text-white font-bold py-2 pl-4 pr-2 rounded-full inline-flex items-center my-4 mx-auto" onClick={handleBuyNowClick}>
                <span className="mr-2 text-lg">SHOP NOW</span>
                <div className="bg-white rounded-full p-1">
                  <div className="bg-white rounded-full p-1.5 ml-auto">
                    <ArrowRight className="w-6 h-6 text-green-800" strokeWidth={4} />
                  </div>
                </div>
              </button>
            </Link>
            <h2>{price}</h2>
          </div>
        </div>
      </div>
    </section>
  );
}
