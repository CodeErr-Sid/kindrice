import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Founder.css';

export default function Founder() {
  const navigate = useNavigate(); 

  const handleClick = () => {
    navigate('/return-policy'); 
  };

  return (
    <section className='founder-sec'>
        <div className='founder-container'>
            <p className='tagline2'>Join us on this heartfelt journey. Choose Kind Rice and be a part of something revolutionary.</p>
            <p className='founder-details'>
              Kishore, Founder, Kind Rice.
            </p>
            <button className='know' onClick={handleClick}>To Know More</button>
        </div>
    </section>
  );
}
