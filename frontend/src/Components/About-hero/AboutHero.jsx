import React from 'react'
import { assets } from '../../assets/assets'
import './AboutHero.css';

export default function AboutHero() {
  return (
    <section className='about-us'>
        <div className='inner-container'>
            <img src={assets.kishore2} alt=''/>
        </div>
        <div className="about-section-section">
            <img src={assets.man} alt=''/>
            <div className="about-overlay-text">
            <h1>IT ALL STARTED WITH A DREAM TO NURTURE OUR PLANET</h1>
            <p className='border-bottom'></p>
            </div>
        </div>
    </section>
  )
}
