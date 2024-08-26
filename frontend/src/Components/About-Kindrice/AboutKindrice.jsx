import React from 'react'
import { assets } from '../../assets/assets'
import './AboutKindrice.css'

export default function AboutKindrice() {
  return (
    <section className='about-kindrice'>
      <div className='content-container'>
        <div className="image-section">
          <img src={assets.paddy} alt=''/>
        </div>
        <div className="text-section-overlay">
          <div className="left">
            <img src={assets.logo} alt=''/>
          </div>
          <div className="right">
          <p>Kind Rice is more than just rice— <span>it's a commitment to health, sustainability, and community.</span> Every bag of Kind Rice supports the people, uplifts farmers, nurtures the planet, and provides you with nutritious, delicious rice.</p>
          </div>
        </div>
      </div>
    </section>
  )
}
