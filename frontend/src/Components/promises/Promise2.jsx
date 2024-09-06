import React from 'react';
import './Promise2.css'; 
import { assets } from '../../assets/assets';

export default function Promise2() {

    return (
      <section className='promise2-section'>
        <div className="promise2-content-container">
          <div className="promise2-heading-container">
            <h1 className='promise2-bold'>Committed to Your Wellness
            </h1>
          
            <p>A superhero protecting you and our planet
            </p>
          </div>
          <div className="promise2-consultation-container">
          <div className="promise2-patient-image">
              <img src={assets.environment} alt='Patient' />
            </div>
            <div className="promise2-info">
            <h2>Kind Rice, <span>comes in cotton bags</span> printed in food-grade inks, <span>free from PVC and microplastics.</span>
            </h2>
            </div>
          
          </div>
        </div>
      </section>
  )
}
