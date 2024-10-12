import React, { useState } from 'react';
import { assets } from '../../assets/assets';
import './FullTransparency.css';

export default function FullTransparency() {

  const [selectedImage, setSelectedImage] = useState(null);

  const certificates = [
    {
      id: 1,
      src: assets.fssai,
      alt: "FSSAI Certificate",
      certificate: assets.certificate5,
      size: { width: "w-36", height: "h-24", mdWidth: "md:w-40", mdHeight: "md:h-40" },
    },
    {
      id: 2,
      src: assets.img2,
      alt: "Test Certificate 1",
      certificate: assets.certificate1,
      size: { width: "w-36", height: "h-24", mdWidth: "md:w-40", mdHeight: "md:h-40" },
    },
    {
      id: 3,
      src: assets.img3,
      alt: "Test Certificate 2",
      certificate: assets.certificate4,
      size: { width: "w-32", height: "h-32", mdWidth: "md:w-36", mdHeight: "md:h-40" },
    },
    {
      id: 4,
      src: assets.img4,
      alt: "Test Certificate 3",
      certificate: assets.certificate6,
      size: { width: "w-28", height: "h-28", mdWidth: "md:w-32", mdHeight: "md:h-40" },
    },
    {
      id: 5,
      src: assets.img5,
      alt: "Test Certificate 4",
      certificate: assets.Certificate7,
      size: { width: "w-32", height: "h-32", mdWidth: "md:w-36", mdHeight: "md:h-36" },
    },
  ];


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
        {certificates.map((cert) => (
          <div key={cert.id} className={`${cert.size.width} ${cert.size.height} ${cert.size.mdWidth} ${cert.size.mdHeight} flex items-center`}>
            <img
              onClick={() => handleButtonClick(cert.certificate)}
              style={{ cursor: 'pointer', zIndex: 1 }}
              className="w-full h-auto object-cover object-center"
              src={cert.src}
              alt={cert.alt}
            />
          </div>
        ))}
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
