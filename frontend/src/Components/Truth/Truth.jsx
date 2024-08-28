import React from 'react'
import { assets } from '../../assets/assets'
import './Truth.css'

export default function Truth() {
  return (
    <section className="truth-section">
        <div className="truth-container">
            <div className="truth-up-container">
                
                <div className="right-content-container-sec">
                    
        <div className="truth-up">
                    <img src={assets.Zoom} alt="left image"/>
                    <h1>The Truth</h1>
                    </div>
                    <p>Transparency is our priority</p>
                </div>
            </div>
            <div className="truth-down-container">
  <p className='truth-para-one'>
    If you are a <span>fitness enthusiast, health-conscious,</span> or a <span>diabetic person</span> who loves regular rice, 
    our <span>Kind-Low GI rice</span> is <span>tested</span> to be a <span>healthy and safe option</span> than normal white rice. 
    However, <span>please note</span> that our rice is not intended to treat diabetes.
  </p>
</div>

        </div>
    </section>
  )
}
