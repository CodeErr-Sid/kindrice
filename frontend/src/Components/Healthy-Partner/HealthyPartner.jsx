
// import { useNavigate } from 'react-router-dom';
import './HealthyPartner.css';
import { assets } from '../../assets/assets';
import React, { useState } from 'react';


export default function HealthyPartner() {
  // const navigate = useNavigate();

  // const handleLabReportClick = () => {
  //   console.log('Lab report link clicked');
  //   navigate('/lab-test');
  // };
  const [selectedImage, setSelectedImage] = useState(null);

  const handleButtonClick = (imageSrc) => {
    setSelectedImage(imageSrc); // Set the selected image for the overlay
  };

  const handleCloseClick = () => {
    setSelectedImage(null); // Close the overlay by resetting the selected image
  };
  return (
    <section>
    <div className='healthy-section hidden md:block'>
      <div className="content-container2">
        <div className="heading-container">
          <h1 className='bold'>Health Partner</h1>
          <h2 className='medium size' >Incredibly Low-GI
          </h2>
        </div>
        <div className="consultation-container">
          <div className="info">
            <h2>Low-GI raises <span>blood sugar</span> levels more gradually. This can help manage <span>blood glucose</span> levels and provide steady energy.</h2>
            <p>
              <i  onClick={() => handleButtonClick(assets.certificate1)} style={{ cursor: 'pointer', zIndex: 1 }}>
                Click for Lab report
              </i>
            </p>
          </div>
          <div className="patient-image">
            <img src={assets.patient} alt='Patient' />
          </div>
        </div>
      </div>
    </div>
    <div className='healthy-section block md:hidden'>
      <div className="content-container2">
        <div className="heading-container">
          <h1 className='bold'>Incredibly Low-GI</h1>
          <div className="info mt-2">
            <h2>Manages <span>blood sugar</span> level effectively. </h2>
            <p>
              <i  onClick={() => handleButtonClick(assets.certificate1)} style={{ cursor: 'pointer', zIndex: 1 }}>
                Click for Lab report
              </i>
            </p>
          </div>
        </div>
        <div className="consultation-container">
         
          <div className="patient-image">
            <img src={assets.patient} alt='Patient' />
          </div>
        </div>
      </div>
    </div>
    {selectedImage && (
        <div className="image-overlay2">
          <div className="overlay-content2">
            <img src={selectedImage} alt="Certificate" />
            <span className="close-icon2" onClick={handleCloseClick}>✕</span>
          </div>
        </div>
      )}
  </section>
  );
}
