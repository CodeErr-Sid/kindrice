import React from 'react';
import './Promise2.css'; 
import { assets } from '../../assets/assets';

export default function Promise2() {

    return (
      <section className='promise2-section'>
        <div className="promise2-content-container">
          <div className="promise2-heading-container">
            <h1 className='promise2-bold'>Our Promise.</h1>
            <h2 className='promise2-medium'>Designed for Your Wellness.</h2>
            <p>A superhero protecting you and the planet.</p>
          </div>
          <div className="promise2-consultation-container">
          <div className="promise2-patient-image">
              <img src={assets.environment} alt='Patient' />
            </div>
            <div className="promise2-info">
            <h2>Kind Rice is the <span>first low-GI rice to be packaged in a food-grade cotton bag</span>, free from harmful microplastics.</h2>
            </div>
          
          </div>
        </div>
      </section>
  )
}
