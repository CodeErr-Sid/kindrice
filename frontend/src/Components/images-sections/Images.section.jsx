import React from 'react'
import { assets } from '../../assets/assets'
import './ImagesSection.css'

export default function ImagesSection() {
  return (
    <section className='multiple-sections'>
        <div className="images-container">
        <img className='philosophy' src={assets.philosophy} alt=''/>
        <img className='truth' src={assets.truth} alt=''/>
        <img className='whyKindRice' src={assets.whyKindRice} alt=''/>
        </div>
    </section>
  )
}
