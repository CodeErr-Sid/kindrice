import React from 'react'
import { assets } from '../../assets/assets'
import './Howitworks.css'

export default function Howitworks() {
  return (
   <div className="howitworks-section">
    
    <div className="how-container">
        <h1>How it works?</h1>
        <div className="how-it-works">
        <div className="first-container">
            <img src={assets.selected} alt=''/>
         </div>
         <div className="paragraphs">
        <p className='first-para'><span>Low GI foods (55 or less):</span> These foods are digested slowly and cause a slower, more gradual rise in blood sugar levels.</p>
     
        <p className='second-para'><span>Medium GI foods (56-69):</span> These foods have a moderate effect on blood sugar levels.</p>
        <p className='third-para'><span>High GI foods (70 or more):</span> These foods are digested quickly and cause a rapid spike in blood sugar levels.</p>
        </div>
        </div>
    </div>
   </div>
  )
}
