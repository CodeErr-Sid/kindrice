import React from 'react'
import { assets } from '../../assets/assets'
import './Philosophy.css'

export default function Philosophy() {
  return (
    <section className='philosophy-section1'>
      <h1>Our Features</h1>
        <div className="images-container1">
        <img className='philosophy1' src={assets.philosophy} alt=''/>
        </div>
    </section>
  )
}
