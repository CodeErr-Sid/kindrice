import React from 'react';
import { assets } from '../../assets/assets';
import './Workers.css'

export default function Workers() {
  return (
    <section className="workers-multiple-sec">
    <div className='workers-section'>
      <div className='workers-content-container'>
        <div className="workers-left">
          <img src={assets.Workers} alt='Worker'/>
        </div>
        <div className="workers-right">
          <p>But we didn't stop there. To address the plastic issue, we chose to package our rice in <span>eco-friendly cotton bags free from harmful chemicals.</span> These bags are crafted with care by people with mental illness, providing them with meaningful employment and a sense of purpose.</p>
        </div>
      </div>
    </div>
    <div className='workers-section'>
      <div className='workers-content-container'>
        <div className="workers-right order-2">
          <p>We also did our best to <span>procure from our farmers.</span> Instead of working with middlemen, we buy directly from farmers, <span>ensuring they receive fair compensation.</span> This helps support their livelihoods and strengthens our community.</p>
        </div>
        <div className="workers-left order-1 ">
          <img src={assets.farmers} alt='Worker'/>
        </div>
      </div>
    </div>
    </section>
  );
}
