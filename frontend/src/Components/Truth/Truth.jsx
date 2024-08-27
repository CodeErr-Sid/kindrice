import React from 'react'
import { assets } from '../../assets/assets'
import './Truth.css'

export default function Truth() {
  return (
    <section className="truth-section">
        <div className="truth-container">
            <div className="truth-up-container">
                <div className="left-image-con">
                    <img src={assets.Zoom} alt="left image"/>
                </div>
                <div className="right-content-container-sec">
                    <h1>The Truth</h1>
                    <p>Transparency is our priority</p>
                </div>
            </div>
            <div className="truth-down-container">
                <p className='truth-para-one'>If you are a <span>fitness enthusiast, health-conscious,</span> or a <span>diabetic person</span> who loves regular rice,
                </p>
                <p className='truth-para-two'>Our <span>Kind-Low Gl rice</span> is <span>tested</span> to be a <span>healthy and safe option </span>than normal white rice.
                </p>
                <p className='truth-para-three'>However, <span>please note</span> that our rice is not intended to treat diabetes</p>
            </div>
        </div>
    </section>
  )
}
