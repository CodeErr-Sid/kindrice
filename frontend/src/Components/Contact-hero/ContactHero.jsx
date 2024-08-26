import React from 'react'
import { assets } from '../../assets/assets'
import './ContactHero.css'


export default function ContactHero() {
  return (
    <section className="contact-hero-section">
        <div className="contact-container">
            <div className="contact-left-container">
              <img src={assets.desk} alt=''/>
            </div>
            <div className="contact-right-container">
                <h1>Contact Us</h1>
            </div>
        </div>
    </section>
  )
}
