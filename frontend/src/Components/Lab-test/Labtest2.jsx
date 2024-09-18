import React, { useState } from 'react';
import './Labtest2.css';
import { assets } from '../../assets/assets';
// Import your PDF file (assuming it's located in your assets folder)


export default function Labtest2() {
  
  const [showPdf, setShowPdf] = useState(false); // State to control PDF overlay

  const handleButtonClick = () => {
    setShowPdf(true); // Show the PDF overlay
  };

  const handleCloseClick = () => {
    setShowPdf(false); // Close the PDF overlay
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
                <i onClick={handleButtonClick} style={{ cursor: 'pointer', zIndex: 99 }}>
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
                <i onClick={handleButtonClick} style={{ cursor: 'pointer', zIndex: 99 }}>
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
{/* PDF Overlay */}
{showPdf && (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-[1000]">
    <div className="relative bg-white rounded-lg shadow-lg p-4 w-11/12 md:w-3/4 lg:w-3/4 h-3/4 lg:h-full">
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
  </div>
)}

    </section>
  );
}
