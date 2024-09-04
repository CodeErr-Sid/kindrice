import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Healthyrice2.css'; 
import { assets } from '../../assets/assets';

export default function Healthyrice2() {
  const navigate = useNavigate();

  const handleLabReportClick = () => {
    navigate('/lab-test'); // Adjust the path according to your route configuration
  };

  return (
    <section className='healthyrice2-section'>
      <div className="healthyrice2-content-container">
        <div className="healthyrice2-heading-container">
          <h1 className='healthyrice2-bold'>Sooo Healthy.</h1>
          <h2 className='healthyrice2-medium'>6.5 Percent Protein.</h2>
          <p>It’s here. The healthiest rice in the history of our company.</p>
        </div>
        <div className="healthyrice2-consultation-container">
          <div className="healthyrice2-info">
            <h2>
              Kind rice provides the <span>protein equivalent of one egg </span>in a 100-gram serving.
            </h2>
            <p onClick={handleLabReportClick} style={{cursor:'pointer'}}><i>Click for Lab report</i></p>
          </div>
          <div className="healthyrice2-patient-image">
            <img src={assets.rice} alt='Patient' />
          </div>
        </div>
      </div>
    </section>
  );
}
