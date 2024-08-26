import React from 'react'
import './Whyitmatters.css'
import { assets } from '../../assets/assets'

export default function Whyitmatters() {
  return (
    <div className="whyitmatters-section">
    
      <div className="whyitmatters-container">
        <h1 className="whyitmatters-title">Why It Matters:</h1>
        <div className="whyitmatters-content">
          <div className="whyitmatters-paragraphs">
            <img src={assets.sugarLevel} alt='' className="whyitmatters-image"/>
            <p className='whyitmatters-first-para'><span>Blood sugar control:</span> Choosing low GI foods more often can help people with diabetes manage their blood sugar levels.</p>
          </div>
          <div className="whyitmatters-paragraphs">
            <img src={assets.weight} alt='' className="whyitmatters-image"/>
            <p className='whyitmatters-second-para'><span>Weight management:</span> Low GI foods may help with weight control by keeping you feeling full for longer.</p>
          </div>
        </div>
      </div>
      
    </div>
  )
}
