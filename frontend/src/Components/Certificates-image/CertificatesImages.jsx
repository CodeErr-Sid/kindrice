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
    
        <div className="certificates-container items-center justify-center md:pl-8">
        <h1 className='text-2xl md:text-4xl font-bold my-4 w-[90%] md:w-[70%] custom-green'>Transparency and Scientific Validation You Can Rely On
        </h1>
        <p className='text-xl my-2  w-[90%] md:w-[70%]'>At Kind Rice, we believe in being open about what goes into our products. Our Low-GI rice has been carefully tested by trusted labs to ensure it helps keep blood sugar levels steady. We're proud to share these lab results with you, so you can see the care and science behind our rice. This openness shows that our rice not only tastes good but also delivers the health benefits. With our certified Low-GI rice, you're choosing a healthier, well-informed option.</p>
        <div className="button-container flex flex-row flex-wrap w-[80%] md:w-[65vw] text-center md:text-left items-center justify-center md:mr-8 ">
        <button className="certificate-button" onClick={() => handleButtonClick(assets.certificate5)}>
           FSSAI
          </button>
          <button className="certificate-button" onClick={() => handleButtonClick(assets.certificate2)}>
          Low-Glycemic Index
          </button>
          <button className="certificate-button" onClick={() => handleButtonClick(assets.certificate3)}>
          Heavy Metals Free
          </button>
          <button className="certificate-button" onClick={() => handleButtonClick(assets.certificate4)}>
          Chemicals Free
          </button>
          <button className="certificate-button" onClick={() => handleButtonClick(assets.certificate6)}>
          210 Pesticides Free
          </button>
          <button className="certificate-button" onClick={() => handleButtonClick(assets.certificate1)}>
          GMO Free
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
