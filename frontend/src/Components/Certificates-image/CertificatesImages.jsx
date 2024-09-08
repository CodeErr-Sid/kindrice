import React, { useState } from 'react';
import { assets } from '../../assets/assets';
import './CertificatesImages.css';

export default function CertificatesImages() {
  const [selectedImage, setSelectedImage] = useState(null);

  const handleButtonClick = (imageSrc) => {
    setSelectedImage(imageSrc); // Set the selected image for the overlay
  };

  const handleCloseClick = () => {
    setSelectedImage(null); // Close the overlay by resetting the selected image
  };

  return (
    <>
      <section className="certificates">
    
        <div className="certificates-container items-center justify-center  md:items-start md:justify-start md:pl-8">
        <h1 className='text-xl md:text-4xl font-bold m-4 md:w-[70%]'>Explore the lab tests for our Low-GI Rice below and see exactly what you're eating.</h1>
        <div className="button-container flex flex-row flex-wrap w-[80%] md:w-[80vw] text-center md:text-left items-center justify-center md:items-start md:justify-start">
          <button className="certificate-button" onClick={() => handleButtonClick(assets.certificate1)}>
            Certificate 1
          </button>
          <button className="certificate-button" onClick={() => handleButtonClick(assets.certificate2)}>
            Certificate 2
          </button>
          <button className="certificate-button" onClick={() => handleButtonClick(assets.certificate3)}>
            Certificate 3
          </button>
          <button className="certificate-button" onClick={() => handleButtonClick(assets.certificate4)}>
            Certificate 4
          </button>
          <button className="certificate-button" onClick={() => handleButtonClick(assets.certificate5)}>
            Certificate 5
          </button>
          <button className="certificate-button" onClick={() => handleButtonClick(assets.certificate6)}>
            Certificate 6
          </button>
          </div>
        </div>
      </section>

      {/* Overlay Popup */}
      {selectedImage && (
        <div className="image-overlay2">
          <div className="overlay-content2">
            <img src={selectedImage} alt="Certificate" />
            <span className="close-icon2" onClick={handleCloseClick}>✕</span>
          </div>
        </div>
      )}
    </>
  );
}
