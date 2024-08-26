import React from 'react'
import './Howlowgi.css'

export default function Howlowgi() {
  return (
    <div className="howlowgi-section">
    
      <div className="howlowgi-container">
        <h1 className="howlowgi-title">How Low-GI?</h1>
        <div className="howlowgi-content">
          <div className="howlowgi-paragraphs">
            <p className='howlowgi-first-para'>Our rice is low GI for two reasons</p>
            <ol className='howlowgi-list' start={1}>
              <li>
                <p className='howlowgi-second-para'>
              1.  The<span> paddy variety, RNR,</span> naturally has a low glycemic index. 
                </p>
              </li>
              <li>
                <p className='howlowgi-third-para'>
              2.  our <span>signature boiling processing</span> method further lowers the glycemic index compared to raw or single-boiled rice
                </p>
              </li>
            </ol>
          </div>
        </div>
      </div>
      
    </div>
  )
}
