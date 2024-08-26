import React from 'react'
import { assets } from '../../assets/assets'
import './CertificateHero.css'

export default function CertificateHero() {
  return (
    <section className="certificate-hero">
      <div className="certificate-container">
        <div className="certificate-left">
          <img src={assets.checking} alt='Certificate' />
        </div>
        <div className="certificate-right">
          <h2 className='one'>Lab Certificates</h2>
          <h2 className='two'>100% Transparent</h2>
        </div>
      </div>
    </section>
  )
}
