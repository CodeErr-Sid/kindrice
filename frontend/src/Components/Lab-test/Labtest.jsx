import React from 'react'
import './Labtest.css'
import { assets } from '../../assets/assets'


export default function Labtest() {
  return (
    <section className='healthy-section2'>
    <div className="content-container2">
      <div className="heading-container2">
        <h1 className='bold2'>Safety is our DNA.</h1>
        <h1 className='bold2'>Passed 210 Lab Tests.</h1>
      </div>
      <div className="consultation-container2">
      <div className="patient-image2">
          <img src={assets.lab} alt='lab' />
        </div>
        <div className="info2">
          <h2>Tested in a <span>NABL-certified lab</span> and conforming to FSSAI standards,
Kind Rice is <span>free from chemicals</span>, and <span>heavy metals</span>, ensuring the
<span> finest quality</span> for your family.</h2>
          <p><i>Click for Lab report</i></p>
        </div>
      
      </div>
    </div>
  </section>
  )
}
