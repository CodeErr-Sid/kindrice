import React from 'react';
import { useNavigate } from 'react-router-dom';
import './HealthyPartner.css';
import { assets } from '../../assets/assets';

export default function HealthyPartner() {
  const navigate = useNavigate();

  const handleLabReportClick = () => {
    console.log('Lab report link clicked');
    navigate('/lab-test');
  };

  return (
    <section className='healthy-section'>
      <div className="content-container2">
        <div className="heading-container">
          {/* <h1 className='bold'>Health Partner.</h1> */}
          <h2 className='medium size' >Incredibly Low-GI
          </h2>
        </div>
        <div className="consultation-container">
          <div className="info">
            <h2>Low-GI raises <span>blood sugar</span> levels more gradually. This can help manage <span>blood glucose</span> levels and provide steady energy.</h2>
            <p>
              <i onClick={handleLabReportClick} style={{ cursor: 'pointer', zIndex: 1 }}>
                Click for Lab report
              </i>
            </p>
          </div>
          <div className="patient-image">
            <img src={assets.patient} alt='Patient' />
          </div>
        </div>
      </div>
    </section>
  );
}
