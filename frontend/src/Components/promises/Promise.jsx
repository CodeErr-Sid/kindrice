import React from 'react'
import './Promise.css'
import { assets } from '../../assets/assets'


export default function Promise() {
  return (
    <section className='promise-section'>
      <div className="promise-content">
        <div className="promise-heading">
          <h1 className='promise-heading-bold'>Our Promise.</h1>
          <h1 className='promise-heading-bold'>Designed for Your Wellness.</h1>
          <p>A superhero protecting you and the planet.</p>
        </div>
        <div className="promise-info-container">
        <div className="promise-image">
            <img src={assets.environment} alt='rice' />
          </div>
          <div className="promise-details">
            <h2>Kind Rice is the <span>first low-GI rice to be packaged in a food-grade cotton bag</span>, free from harmful microplastics.</h2>
          </div>
          
        </div>
      </div>
    </section>
  )
}
