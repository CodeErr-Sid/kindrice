import React from 'react'
import './Management.css'
import { assets } from '../../assets/assets'


export default function Management() {
  return (
    <section className='management-section'>
      <div className="management-content">
        <div className="management-heading">
          <h1 className='management-heading-bold'>Helps in Weight Management.</h1>
        </div>
        <div className="management-info-container">
          <div className="management-image">
            <img src={assets.gym} alt='environment' />
          </div>
          <div className="management-details">
            <h2>Kind Rice helps with weight management by <span>releasing energy slowly</span>, which keeps you <span>full for longer</span>, reduces cravings, and helps you <span>stay energized. </span></h2>
          </div>
        </div>
      </div>
    </section>
  )
}
