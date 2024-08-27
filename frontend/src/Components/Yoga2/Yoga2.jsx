import React from 'react'
import { assets } from '../../assets/assets'
import './Yoga2.css'

export default function Yoga2() {
  return (
   <section className="yoga2-section">
    <div className="yoga2-container">
        <div className="yoga2-left-container">
            <img src={assets.yoga2} alt=''/>
        </div>
        <div className="yoga2-right-container">
            <h2>Healthy Rice for Healthy Lifestyle</h2>
        </div>
    </div>
    <div className="third-section">
        <img src={assets.Home3} alt=''/>
        </div>
   </section>
  )
}
