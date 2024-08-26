import React from 'react'
import './Impact-hero.css'
import { assets } from '../../assets/assets'


export default function Impacthero() {
  return (
   <section className='Impact-hero-section'>
    <div className='Impact-hero-container'>
    <div className='Impact-hero-image-left'>
        <img src={assets.earth} alt=''/>
    </div>
        <div className='Impact-hero-content-right'>
      <h1>  How does <br/> Kind Rice <br/> <span>Impact the World.</span></h1>
        </div>
    </div>
   </section>
  )
}
