import React from 'react'
import { assets } from '../../assets/assets'
import './Vision.css'

export default function Vision() {
  return (
  <section className="vision-sec">
  <div className="vision-container">
    <div className="vision-up">
        <div className="logo-img">
            <img src={assets.kindl} alt="logo"/>
        </div>
        <div className='line'>

        </div>
        <div className="vision-text">
            <h2>VISION</h2>
        </div>
    </div>
    <div className="vision-mid">
        <p>To be the world’s leading rice brand, celebrated for our unwavering dedication to quality, sustainability, and community.</p>
    </div>
    <div className="vision-down">
        <div className="img-contents">
            <img src={assets.quality} alt="quality"/>
            <p>HIGHEST<br/> QUALITY</p>
        </div>
        <div className="img-contents second">
            <img src={assets.support} alt="support"/>
            <p>SUPPORTING <br/>UNITED NATIONS</p>
        </div>
        <div className="img-contents">
            <img src={assets.empower2} alt="community"/>
            <p>EMPOWERING <br/>COMMUNITIES</p>
        </div>
    </div>
  </div>
  </section>
  )
}
