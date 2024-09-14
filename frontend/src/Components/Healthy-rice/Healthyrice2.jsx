import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Healthyrice2.css'; 
import { assets } from '../../assets/assets';


export default function Healthyrice2() {
  const [selectedImage, setSelectedImage] = useState(null);

  const handleButtonClick = (imageSrc) => {
    setSelectedImage(imageSrc); // Set the selected image for the overlay
  };

  const handleCloseClick = () => {
    setSelectedImage(null); // Close the overlay by resetting the selected image
  };

  return (
    <section>
    <div className='healthyrice2-section hidden md:block'>
      <div className="healthyrice2-content-container">
        <div className="healthyrice2-heading-container">
          <h1 className='healthyrice2-bold'>Sooo Healthy,</h1>
          <h2 className='healthyrice2-medium'>6.5 grams protein
          </h2>
          <p>It’s Here: the healthiest rice we’ve ever offered
          </p>
        </div>
        <div className="healthyrice2-consultation-container">
          <div className="healthyrice2-info">
            <h2>
            Kind rice offers the <span>protein equivalent of an egg</span> in every 100 gram serving.
            </h2>
            <p  onClick={() => handleButtonClick(assets.Certificate7)} style={{cursor:'pointer'}}><i>Click for Lab report</i></p>
          </div>
          <div className="healthyrice2-patient-image">
            <img src={assets.rice} alt='Patient' />
          </div>
        </div>
      </div>
    </div>
    <div className='healthyrice2-section block md:hidden'>
      <div className="healthyrice2-content-container">
        <div className="healthyrice2-heading-container">
          <h1 className='healthyrice2-bold'>Sooo Healthy,</h1>
          <h2 className='healthyrice2-medium'>6.5 grams protein
          </h2>
          <p className='mt-2'>It’s Here: the healthiest rice we’ve ever offered
          </p>
          <div className="healthyrice2-info">
            <p  onClick={() => handleButtonClick(assets.certificate3)} style={{cursor:'pointer'}}><i>Click for Lab report</i></p>
          </div>
        </div>
        <div className="healthyrice2-consultation-container">
          
          <div className="healthyrice2-patient-image">
            <img src={assets.rice} alt='Patient' />
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
