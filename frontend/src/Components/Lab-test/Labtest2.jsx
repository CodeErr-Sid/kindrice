import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Labtest2.css';
import { assets } from '../../assets/assets';


export default function Labtest2() {
  // const navigate = useNavigate();

  // const handleLabReportClick = () => {
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
    <div className='labtest2-section hidden md:block'>
      <div className="labtest2-content">
        <div className="labtest2-heading">
          <h1 className='labtest2-bold'>Safety is in our DNA, 
          </h1>
          <h2 className='medium'>Proven by 210 tests</h2>
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
              <i onClick={() => handleButtonClick(assets.chemicalfree1)} style={{ cursor: 'pointer', zIndex: 99 }}>
                Click for Lab report
              </i>
            </p>
          </div>
        </div>
      </div>
    </div>
    <div className='labtest2-section block md:hidden'>
      <div className="labtest2-content">
        <div className="labtest2-heading">
          <h1 className='labtest2-bold'>Safety is in our DNA, 
          </h1>
          <h2 className='medium'>Proven by 210 tests</h2>
          <div className="labtest2-details">
           
            <p className='mt-2'>
              <i onClick={() => handleButtonClick(assets.chemicalfree1)} style={{ cursor: 'pointer', zIndex: 99 }}>
                Click for Lab report
              </i>
            </p>
          </div>
        </div>
        <div className="labtest2-info-container">
          <div className="labtest2-image">
            <img src={assets.lab} alt='Lab' />
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
