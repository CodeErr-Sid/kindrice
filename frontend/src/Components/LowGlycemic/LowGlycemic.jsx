import React from 'react'
import './LowGlucemic.css'
import { assets } from '../../assets/assets'

export default function LowGlycemic() {
  return (
    <div className="lowglycemic-section">
      <div className="lowglycemic-content-left">
        <img src={assets.lowGlycemic} alt=''/>
      </div>
      <div className="lowglycemic-section__content-right">
        <p>Other foods, like <span>low-GI rice,</span> grains, and some fruits, <span>give us energy more slowly (low GI). It's like putting slower fuel in the car, so it goes steady.</span>
        <br/>
        <br/>
        So, the glycemic index helps us know which foods give us energy fast and which ones give us energy slowly.
        <br/>
        <br/>
        Low glycemic index (GI) rice is like putting in fuel that makes the car<span>go steadily and for longer.</span> 
        </p>
      </div>
    </div>
  )
}
