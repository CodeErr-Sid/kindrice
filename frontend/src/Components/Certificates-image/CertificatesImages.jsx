import React, { useState } from 'react';
import { assets } from '../../assets/assets';
import './CertificatesImages.css';

export default function CertificatesImages() {
  const [selectedContent, setSelectedContent] = useState(null);
  const [isPdf, setIsPdf] = useState(false);

  const handleButtonClick = (contentSrc, isPdf = false) => {
    setSelectedContent(contentSrc);
    setIsPdf(isPdf); // Set whether the selected content is a PDF or image
  };

  const handleCloseClick = () => {
    setSelectedContent(null);
    setIsPdf(false); // Close the overlay and reset the content
  };

  return (
    <>
      <section className="certificates">
        <div className="certificates-container items-center justify-center md:pl-8">
          <h1 className="text-2xl md:text-4xl font-bold my-4 w-[90%] md:w-[70%] custom-green">
            Transparency and Scientific Validation You Can Rely On
          </h1>
          <p className="text-xl my-2  w-[90%] md:w-[70%] para-lab">
            At Kind Rice, we believe in being open about what goes into our products. Our Low-GI rice has been carefully tested by trusted labs to ensure it helps keep blood sugar levels steady. We're proud to share these lab results with you, so you can see the care and science behind our rice. This openness shows that our rice not only tastes good but also delivers the health benefits. With our certified Low-GI rice, you're choosing a healthier, well-informed option.
          </p>
          <p className='text-xl my-2  w-[90%] md:w-[70%] para-lab2 mb-8'>At Kind Rice, we believe in being open about what goes into our products. Our Low-GI rice has been carefully tested by trusted labs to ensure it helps keep blood sugar levels steady.
        With our certified Low-GI rice, you're choosing a healthier, well-informed option.
        </p>
          <div className="button-container flex flex-row flex-wrap w-[80%] md:w-[65vw] text-center md:text-left items-center justify-center md:mr-8 ">
            <button className="certificate-button" onClick={() => handleButtonClick(assets.certificate5)}>
              FSSAI
            </button>
            <button className="certificate-button" onClick={() => handleButtonClick(assets.certificate2)}>
              Rice Quality Test
            </button>
            <button className="certificate-button" onClick={() => handleButtonClick(assets.certificate3)}>
              Heavy Metals Free
            </button>
            <button className="certificate-button" onClick={() => handleButtonClick(assets.certificate4)}>
              GMO Free
            </button>
            <button className="certificate-button" onClick={() => handleButtonClick(assets.certificate6)}>
              Chemical Free
            </button>
            <button className="certificate-button" onClick={() => handleButtonClick(assets.certificate1)}>
              Low-Glycemic Index
            </button>
            <button className="certificate-button" onClick={() => handleButtonClick(assets.chemicalFree, true)}>
              210 Pesticide Free
            </button>
            <button className="certificate-button" onClick={() => handleButtonClick(assets.Certificate7)}>
              Nutritional Value
            </button>
          </div>
        </div>
      </section>

  {/* Overlay Popup */}
  {selectedContent && (
        <div className="image-overlay2">
           {isPdf ? (
        <div className="relative bg-white rounded-lg shadow-lg p-4 w-11/12 md:w-3/4 lg:w-[70%] h-3/4 lg:h-full">
        <iframe
          src={assets.chemicalFree}
          title="Lab Report PDF"
          className="w-full h-full py-8"
        ></iframe>
              <span
              className="absolute top-2 right-2 text-gray-700 text-xl cursor-pointer hover:text-gray-900"
              onClick={handleCloseClick}
            >
              ✕
            </span>
          </div>
            ) : (
              <div className="overlay-content2">
             
              <img src={selectedContent} alt="Certificate" className="w-full h-auto" />
              <span
              className="absolute top-2 right-2 text-gray-700 text-xl cursor-pointer hover:text-gray-900"
              onClick={handleCloseClick}
            >
              ✕
            </span>
          </div>
            )}
         
        </div>
      )} 
    </>
  );
}
