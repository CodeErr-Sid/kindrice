import React from 'react'
import './Howlowgi.css'

export default function Howlowgi() {
  return (
    <div className="howlowgi-section">
    
      <div className="howlowgi-container">
        <h1 className="howlowgi-title">How Kind Rice is Low-GI?
        </h1>
        <div className="howlowgi-content">
          <div className="howlowgi-paragraphs">
            {/* <p className='howlowgi-first-para'>Our rice is low GI for two reasons</p> */}
            <ul className='howlowgi-list'>
              <li>
                <p className='howlowgi-second-para'>
                We procure the RNR paddy variety directly from farmers, which naturally has a low glycemic index.

                </p>
              </li>
              <li>
                <p className='howlowgi-third-para'>
                Additionally, our signature boiling method makes the GI even lower than that of raw or single-boiled rice.
                </p>
              </li>
            </ul>
          </div>
        </div>
      </div>
      
    </div>
  )
}
