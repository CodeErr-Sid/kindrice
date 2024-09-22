import React, { useState } from 'react';
import { assets } from '../../assets/assets';
import './FullTransparency.css';

export default function FullTransparency() {

  const [selectedImage, setSelectedImage] = useState(null);

  const handleButtonClick = (imageSrc) => {
    setSelectedImage(imageSrc); // Set the selected image for the overlay
  };

  const handleCloseClick = () => {
    setSelectedImage(null); // Close the overlay by resetting the selected image
  };
  return (
    <section className="w-full m-0 p-0">
      {/* Main title section */}
      <div className="flex flex-col items-center justify-center w-[80vw] mx-auto text-center gap-3">
        <h1 className="text-4xl md:text-5xl font-bold">Full Transparency</h1>
        <p className=" text-green-800 text-2xl md:text-2xl">Nothing to Hide</p>
      </div>

      {/* Icons section */}
      <div className="flex flex-col md:flex-row gap-4 md:gap-8 items-center justify-center mt-0 md:mt-6">
  {/* FSSAI icon */}
  <div className="w-36 h-24 md:w-40 md:h-40">
    <img  onClick={() => handleButtonClick(assets.certificate5)} style={{ cursor: 'pointer', zIndex: 1 }}
      className="w-40 h-auto object-cover object-center"
      src={assets.fssai}
      alt="FSSAI Certificate"
    />
  </div>

  {/* Test icons */}
  <div className="w-36 h-24 ml-4 md:w-40 md:h-40">
    <img onClick={() => handleButtonClick(assets.certificate1)} style={{ cursor: 'pointer', zIndex: 1 }}
      className="w-40 h-auto object-cover "
      src={assets.img2}
      alt="Test Certificate 1"
    />
  </div>
  <div className="w-32 h-32 md:w-36 md:h-40 ">
    <img onClick={() => handleButtonClick(assets.certificate4)} style={{ cursor: 'pointer', zIndex: 1 }}
      className="w-full h-auto object-cover object-center "
      src={assets.img3}
      alt="Test Certificate 2"
    />
  </div>
  <div className="w-28 h-28 md:w-32 md:h-40">
    <img onClick={() => handleButtonClick(assets.certificate6)} style={{ cursor: 'pointer', zIndex: 1 }}
      className="w-30 h-auto object-cover object-center"
      src={assets.img4}
      alt="Test Certificate 3"
    />
  </div>
  <div className="w-32 h-32 md:w-36 md:h-36">
    <img onClick={() => handleButtonClick(assets.Certificate7)} style={{ cursor: 'pointer', zIndex: 1 }}
      className="w-32 h-auto object-cover object-center"
      src={assets.img5}
      alt="Test Certificate 4"
    />
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
      {/* Click prompt */}
      <p className="text-center text-2xl md:text-3xl ">
        Click on icons to get certificates
      </p>
    </section>
  );
}
