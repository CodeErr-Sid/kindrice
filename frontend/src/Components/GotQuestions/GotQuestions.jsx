import React, { useState } from 'react';
import './GotQuestions.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck, faStar, faStarHalfAlt, faStar as faStarOutline } from '@fortawesome/free-solid-svg-icons';

export default function GotQuestions() {
  // State to track the index of the visible content
  const [visibleIndex, setVisibleIndex] = useState(null);

  // Function to toggle visibility of a specific section
  const toggleVisibility = (index) => {
    setVisibleIndex(visibleIndex === index ? null : index);
  };

  const rating = 5; // Example rating (can be a decimal value)

  // Create an array of stars based on the rating
  const stars = Array.from({ length: 5 }, (_, index) => {
    if (rating >= index + 1) {
      return <FontAwesomeIcon key={index} icon={faStar} className="text-yellow-400" />;
    } else if (rating >= index + 0.5) {
      return <FontAwesomeIcon key={index} icon={faStarHalfAlt} className="text-yellow-400" />;
    } else {
      return <FontAwesomeIcon key={index} icon={faStarOutline} className="text-yellow-400" />;
    }
  });

  return (
    <section className="w-full p-0 mt-12 mb-24">
      <div className="container flex items-center justify-center mx-auto mt-28 flex-col gap-2 ">
        <h1 className="text-center text-4xl md:text-5xl font-bold">Got Questions?</h1>
        <p className='text-center text-2xl md:text-2xl text-customGreen'>We hear you</p>
        
        <div className='border-2 border-black w-[90%] md:w-[90%] mt-12'>
          {/* Question 1 */}
          <div className="border-b-2 border-black">
            <div className="p-4">
              <div className='flex justify-between py-2'>
                <h1 className='text-2xl md:text-3xl font-bold'>How kind rice is low Gi?</h1>
                <h1 className='text-3xl md:text-4xl font-bold cursor-pointer' onClick={() => toggleVisibility(0)}>
                  {visibleIndex === 0 ? '∧' : 'v'}
                </h1>
              </div>
              {visibleIndex === 0 && (
                <div className="flex flex-col text-[1rem] md:text-xl mt-2 ">
                  <h2>Our rice is low GI for two reasons:</h2>
                  <ol start={1}>
                    <li>1. The paddy variety, RNR, naturally has a low glycemic index.</li>
                    <li>2. Our boiling processing method further lowers the glycemic index compared to raw or single-boiled rice.</li>
                  </ol>
                </div>
              )}
            </div>
          </div>

          {/* Question 2 */}
          <div className="border-b-2 border-black">
            <div className="p-4">
              <div className='flex justify-between py-2'>
                <h1 className='text-2xl md:text-3xl font-bold'>How does kind rice taste?</h1>
                <h1 className='text-3xl md:text-4xl font-bold cursor-pointer' onClick={() => toggleVisibility(1)}>
                  {visibleIndex === 1 ? '∧' : 'v'}
                </h1>
              </div>
              {visibleIndex === 1 && (
                <div className="flex flex-col text-[1rem] md:text-xl mt-2">
                  <h2>It tastes like your regular rice.</h2>
                </div>
              )}
            </div>
          </div>

          {/* Question 3 */}
          {/* <div className="border-b-2 border-black"> */}
            <div className="p-4">
              <div className='flex justify-between py-2'>
                <h1 className='text-2xl md:text-3xl font-bold'>Is the kind low-GI suitable for vegetarians?</h1>
                <h1 className='text-3xl md:text-4xl font-bold cursor-pointer' onClick={() => toggleVisibility(2)}>
                  {visibleIndex === 2 ? '∧' : 'v'}
                </h1>
              </div>
              {visibleIndex === 2 && (
                <div className="flex flex-col text-[1rem] md:text-xl mt-2">
                  <h2>Yes. This kind low-GI is 100% suitable for vegetarians.</h2>
                </div>
              )}
            </div>
          </div>
        </div>
      {/* </div> */}

      {/* Verified Reviews */}
      {/* <div className="container flex items-center justify-center mx-auto mt-28 flex-col gap-2">
        <h1 className="text-center text-4xl md:text-5xl font-bold">Verified Reviews</h1>
        <p className='text-center text-2xl md:text-2xl text-customGreen'>From Real People</p>
        <div className='w-[90%] m-8'>
          <div className='flex flex-col'>
            <div className='flex flex-row gap-4 items-center'>
              <h1 className="text-center text-4xl md:text-5xl font-bold">Rani</h1>
              <FontAwesomeIcon icon={faCircleCheck} className="text-green-600 text-2xl md:text-3xl" />
            </div>
            <div className="flex items-center gap-1 my-4 text-xl">
              {stars}
            </div>
            <h1 className='text-[1rem] md:text-xl'>
              One of the best rice, I have tasted.
            </h1>
            <hr className='border-black border-t-2 my-6' />
          </div>
        </div>
        <div className='w-[90%] '>
          <div className='flex flex-col'>
            <div className='flex flex-row gap-4 items-center'>
              <h1 className="text-center text-4xl md:text-5xl font-bold">Rahman</h1>
              <FontAwesomeIcon icon={faCircleCheck} className="text-green-600 text-2xl md:text-3xl" />
            </div>
            <div className="flex items-center gap-1 my-4 text-xl">
              {stars}
            </div>
            <h1 className='text-[1rem] md:text-xl'>
              Tasty, Clean, healthy.
            </h1>
            <hr className='border-black border-t-2 my-6' />
          </div>
        </div>
        <div className='text-center text-customGreen text-2xl md:text-3xl my-28 font-bold w-[80%] md:w-[90%]'>
          <h1>By choosing kind rice, you're caring for your health, supporting farmers, empowering communities, and protecting the planet.</h1>
        </div>
      </div> */}
    </section>
  );
}