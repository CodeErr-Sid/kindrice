import React from 'react'
import { assets } from '../../assets/assets'
import './ReturnPolicyHero.css'

export default function ReturnPolicyHero() {
  return (
   <section className="return-policy-hero">
    <div className="return-policy-container">
        <div className="return-policy-left">
         <img src={assets.returnPolicy} alt=''/>
        </div>
        <div className="return-policy-right">
            <h2>Return Policy</h2>
        </div>
    </div>
   </section>
  )
}
