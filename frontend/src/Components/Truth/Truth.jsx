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
                    {/* <img src={assets.Zoom} alt="left image"/> */}
                    <h1>The Truth</h1>
                    </div>
                    <p>Transparency is our priority</p>
                </div>
            </div>
            <div className="truth-down-container">
  <p className='truth-para-one'>
  If you're a <span>fitness enthusiast,</span> health-conscious individual, or <span>diabetic person</span> who loves regular rice but needs a <span>healthier option,</span> our Kind-Low GI rice is a tested and safer alternative to white rice. However, please note that it is not intended to <span>treat diabetes.</span>
  </p>
</div>

        </div>
    </section>
  )
}
