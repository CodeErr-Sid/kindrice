import React from 'react'
import './VerifiedCertificate.css'
import {assets} from '../../assets/assets'

export default function VerifiedCertificate() {
  return (
    <section className='verification-section'>
        <div className='verification-container'>
            <div className="verification-left-section">
                <div className="verification-left-section-image">
                <img src={assets.logo} alt=''/>
                <p className='verified-first-para'><span><b>G</b>lycemic <b>I</b>ndex is <b>52.21</b></span><br/> It is verified as <b>low-GI rice.</b></p>
                <p className='verified-second-para'>Farm Grown.<br/> Tastes like normal rice.<br/> Non-GMO. Free from Chemicals.</p>
                </div>
            </div>
            <div className="verification-right-section">
                <div className="verification-right-section-image">
                    <img src={assets.verifiedCertificate} alt=''/>
                </div>
            </div>
        </div>
    </section>
   
  )
}
