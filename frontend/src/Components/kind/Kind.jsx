import React from 'react'
import { assets } from '../../assets/assets'
import './Kind.css'

export default function Kind() {
  return (
    <section className="yoga-section">
    <div className="yoga-container">
        <div className="yoga-header">
            <h1 className="yoga-title">One of a Kind.</h1>
            <p>Specially made for you.</p>
        </div>
        <div className="yoga-image">
            <img src={assets.yoga} alt=''/>

        </div>
    </div>
</section>
  )
}
