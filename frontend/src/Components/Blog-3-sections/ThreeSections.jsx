import React from 'react'
import './ThreeSections.css'
import { assets } from '../../assets/assets'


export default function threeSections() {
  return (
    <div className="three-sections">
    <div className="section1">
        <div className="hero-img">
            <img src={assets.contentCreators} alt=''/>
        </div>
        <div className="right-heading">
        <h2>Our Blog</h2>
        </div>
    </div>
    <div className="section2">
    <h2>Latest Publications</h2>
        <p>Welcome to the <span>Kind Rice Blog!</span> Discover premium rice varieties, health tips, recipes, sustainability practices, and farmer stories. Explore how rice can enhance your life and support a sustainable future.</p>
        <br/>
        <br/>
        <p>Low GI rice maintains blood sugar, supports weight management, and provides sustained energy. Basmati rice is rich in vitamins, has a low glycemic index, and promotes heart health. Rice varieties are also easily digestible, aiding gut health, especially for sensitive stomachs.</p>
    </div>
</div>

  )
}
