import React from 'react'
import './Example.css'
import { assets } from '../../assets/assets'


export default function Example() {
  return (
   <div className="example-section">
  <div className="example-section-container">
    <div className="example-content-left">
       <img src={assets.cars} alt=''/>
    </div>
    <div className="example-section__content-right">
       <h2>Imagine your <span>body is like a car that needs fuel to run</span></h2>
       <p className='first-child'>
       Carbohydrate foods like bread, rice, and fruits give your body fuel. <span>The glycemic index (GI) is like a special scale that tells us how fast different foods give us energy.</span>
        </p>
        <p className='second-child'>
        Some foods, like <span>normal rice</span>  and candy, give us <span>energy really fast (high Gl). It's like putting fast fuel into the car,</span> so it goes zoom!
       </p>
    </div>
    <p className='small-screen'>
        Some foods, like normal rice and candy, give us  energy really fast (high Gl). It's like putting fast fuel into the car,so it goes zoom!
       </p>
  </div>
  </div>
  )
}
