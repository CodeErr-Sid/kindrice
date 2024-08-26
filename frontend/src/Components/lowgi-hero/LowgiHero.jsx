import React from 'react'
import './LowgiHero.css'
import { assets } from '../../assets/assets'


export default function LowgiHero() {
  return (
    <section className="lowgi-hero-section">
        <div className="lowgi-hero-container">
            <div className="lowgi-hero-content">
                <h1 className="lowgi-hero-title">What is Low-GI Rice?</h1>
            </div>
           <div className="lowgi-img-container">
            <img src={assets.Gardening} alt="Low-GI Rice Hero" />
           </div>
        </div>
    </section>
  )
}
