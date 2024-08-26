import React from 'react'
import { assets } from '../../assets/assets'
import './Thoughts.css'

export default function Thoughts() {
  return (
   <section className='his-thoughts'>
    <div className='section-content-container'>
        <div className="left-sec">
            <img src={assets.man2} alt=''/>
        </div>
        <div className="right-sec">
            <h1>I always asked myself, "What difference can I make in this world?</h1>
            <p>One day, while climbing Samanar Malai, my favorite hill in Madurai, I was struck by the sight of plastic waste everywhere. The beauty of the place was overshadowed by discarded bottles. It broke my heart. Determined to make a small difference, I picked up what I could, tossing the trash into dustbins.</p>
        </div>
    </div>
   </section>
  )
}
