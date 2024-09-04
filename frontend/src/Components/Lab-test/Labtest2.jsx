import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Labtest2.css';
import { assets } from '../../assets/assets';

export default function Labtest2() {
  const navigate = useNavigate();

  const handleLabReportClick = () => {
    navigate('/lab-test');
  };

  return (
    <section className='labtest2-section'>
      <div className="labtest2-content">
        <div className="labtest2-heading">
          <h1 className='labtest2-bold'>Safety is our DNA</h1>
          <h2 className='medium'>Passed 210 Lab Tests.</h2>
        </div>
        <div className="labtest2-info-container">
          <div className="labtest2-image">
            <img src={assets.lab} alt='Lab' />
          </div>
          <div className="labtest2-details">
            <h2>
              Tested in a <span>NABL-certified lab</span> and conforming to FSSAI standards,
              Kind Rice is <span>free from chemicals</span>, and <span>heavy metals</span>,
              ensuring the <span>finest quality</span> for your family.
            </h2>
            <p>
              <i onClick={handleLabReportClick} style={{ cursor: 'pointer', zIndex: 99 }}>
                Click for Lab report
              </i>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}