import React from 'react';
import { assets } from '../../assets/assets';
import './FullTransparency.css';

export default function FullTransparency() {
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
  <div className="w-32 h-24 md:w-40 md:h-40">
    <img
      className="w-40 h-auto object-cover object-center"
      src={assets.fssai}
      alt="FSSAI Certificate"
    />
  </div>

  {/* Test icons */}
  <div className="w-32 h-24 md:w-40 md:h-40">
    <img
      className="w-40 h-auto object-cover mt-6 "
      src={assets.img2}
      alt="Test Certificate 1"
    />
  </div>
  <div className="w-32 h-32 md:w-36 md:h-40 ">
    <img
      className="w-full h-auto object-cover object-center "
      src={assets.img3}
      alt="Test Certificate 2"
    />
  </div>
  <div className="w-32 h-32 md:w-36 md:h-40">
    <img
      className="w-32 h-auto object-cover object-center"
      src={assets.img4}
      alt="Test Certificate 3"
    />
  </div>
  <div className="w-32 h-32 md:w-36 md:h-36">
    <img
      className="w-32 h-auto object-cover object-center"
      src={assets.img5}
      alt="Test Certificate 4"
    />
  </div>
</div>

      {/* Click prompt */}
      <p className="text-center text-2xl md:text-3xl ">
        Click on icons to get certificates
      </p>
    </section>
  );
}
