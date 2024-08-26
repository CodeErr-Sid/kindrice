import React from 'react'
import { assets } from '../../assets/assets'
import './CertificatesImages.css'

export default function CertificatesImages() {
  return (
    <section className="certificates">
        <div className="certificates-container">
            <div className="certificates-image">
                <img src={assets.certificate1} alt=''/>
            </div>
            <div className="certificates-image">
            <img src={assets.certificate2} alt=''/>
            </div>
            <div className="certificates-image">
            <img src={assets.certificate3} alt=''/>
            </div>
            <div className="certificates-image">
            <img src={assets.certificate4} alt=''/>
            </div>
            <div className="certificates-image">
            <img src={assets.certificate5} alt=''/>
            </div>
            <div className="certificates-image">
            <img src={assets.certificate6} alt=''/>
            </div>
        </div>
    </section>
  )
}
