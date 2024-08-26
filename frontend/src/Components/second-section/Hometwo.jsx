import React from 'react'
import { assets } from '../../assets/assets';
import './Hometwo.css';

export default function Hometwo() {
  return (
    <section className="home2">
        <img src={assets.Home2} alt=''/>
        <div className="third-section">
        <img src={assets.Home3} alt=''/>
        </div>
    </section>
  )
}
