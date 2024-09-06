import React from 'react'
import './Whyitmatters.css'
import { assets } from '../../assets/assets'

export default function Whyitmatters() {
  return (
    <div className="whyitmatters-section">
    
      <div className="whyitmatters-container">
        <h1 className="whyitmatters-title">Why it Matters?</h1>
        <div className="whyitmatters-content">
          <div className="whyitmatters-paragraphs">
            <img src={assets.sugarLevel} alt='' className="whyitmatters-image img-one"/>
            <p className='whyitmatters-first-para'><span>Manages blood glucose level</span> Choosing Low-GI foods more often can help people with diabetes manage their blood sugar levels.</p>
          </div>
          <div className="whyitmatters-paragraphs">
            <img src={assets.weight} alt='' className="whyitmatters-image img-one"/>
            <p className='whyitmatters-second-para'><span>
            Assists Weight Management:</span> Low-GI foods help with weight management by keeping you full for longer, reducing cravings.</p>
          </div>
        </div>
      </div>
      
    </div>
  )
}
