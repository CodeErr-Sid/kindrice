import React from 'react'
import { assets } from '../../assets/assets'
import './Moment.css'

export default function Moment() {
  return (
    <section className='moment-sections'>
    <div className="moment-section">
        <div className="moment-container">
            <img src={assets.factory} alt=''/>
            <div className="moment-overlay-text">
                <p>
            The next day, back at our rice mill, I watched as hundreds of rice bags were packed in plastic bags. The memory of the littered hill haunted me. 
            <br/>
            <br/>
            <span>How could I contribute to the same problem I was trying to solve?</span> It felt like a punch in the gut. That was the moment Kind Rice was born.
            </p>
            </div>
        </div>
    </div>
    <div className="info-content">
        <p>We decided to change everything. Our journey began with holistic health in mind. We meticulously researched and selected the finest paddy, using our signature method to produce low-GI rice. This rice supports stable blood sugar levels, making it a healthier choice for everyone.</p>
    </div>
    </section>
  )
}
