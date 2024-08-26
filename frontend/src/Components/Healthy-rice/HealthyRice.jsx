import React from 'react';
import './HealthyRice.css'; 
import { assets } from '../../assets/assets';


export default function HealthyRice() {
  return (
    <section className='healthy-rice-section'>
      <div className="healthy-rice-content">
        <div className="healthy-rice-heading">
          <h1 className='heading-bold'>Sooo Healthy.</h1>
          <h1 className='heading-bold'>6.5 Percent Protein.</h1>
          <p>It’s here. The healthiest rice in the history of our company.</p>
        </div>
        <div className="healthy-rice-info-container">
         
          <div className="healthy-rice-details">
            <h2>Kind rice provides the <span>protein equivalent of one egg </span>in a 100-gram serving.</h2>
            <p><i>Click for Lab report</i></p>
          </div>
          <div className="healthy-rice-image">
            <img src={assets.rice} alt='rice' />
          </div>
        </div>
      </div>
    </section>
  );
}
