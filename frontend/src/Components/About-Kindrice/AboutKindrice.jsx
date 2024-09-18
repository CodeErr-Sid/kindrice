import React from 'react'
import { assets } from '../../assets/assets'
import './AboutKindrice.css'

export default function AboutKindrice() {
  return (
    <>
      <section className='relative md:py-40'>
        <div className="kr-img-container absolute h-full w-full top-0 z-[-1]">
          <img src={assets.paddy} alt="" className='object-cover w-full h-full opacity-[.3]' />
        </div>
        <div className="kr-content-section flex flex-col md:flex-row items-center p-5">
          <div className="kr-left flex-1">
            <img src={assets.kindl} alt="" className='object-contain aspect-[5/2] w-4/5 mx-auto' />
          </div>
          <div className="right kr-right flex-1">
            <p className='md:w-2/3 mx-auto my-2'>Kind Rice is more than just rice— <span>it's a commitment to health, sustainability, and community.</span> Every bag of Kind Rice supports the people, uplifts farmers, nurtures the planet, and provides you with nutritious, delicious rice.</p>
          </div>
        </div>
      </section>

    </>

  )
}
