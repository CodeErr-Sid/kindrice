import React from 'react';
import { assets } from '../../assets/assets';
import { Link, useNavigate } from 'react-router-dom';

export default function HomeHero() {
    const navigate = useNavigate();

    const handleBuyNowClick = () => {
      navigate('/shop');
    };
  return (
    <section>
      {/* Desktop View */}
      <div className="relative w-full h-screen bg-cover bg-center hidden md:block" style={{ backgroundImage: `url(${assets.desktopHero})` }}>
        <div className='absolute inset-0 flex flex-col justify-center items-left text-white px-8 lg:px-24'>
          {/* Text Section */}
          <h1 className='text-5xl lg:text-6xl font-bold  mb-4'>
            A Low-GI Rice
          </h1>
          <h2 className='text-lg lg:text-4xl mb-6'>
            So Clean. So Tasty. So Healthy.
          </h2>
          <Link to='/shop'>
          <button className='bg-green-700 text-xl text-white py-2 px-8 rounded-full hover:bg-green-600 transition-all w-[25vw]'>
            Shop now
          </button>
          </Link>
          <p className='text-lg lg:text-xl font-semibold mt-6 px-2 '>
            From ₹159
          </p>
        </div>
      </div>

      {/* Mobile View */}
      <div className="relative w-full h-screen bg-cover bg-bottom block md:hidden bg-no-repeat" style={{ backgroundImage: `url(${assets.mobileHero})` }}>
        <div className='absolute inset-0 flex flex-col justify-center items-center text-center text-white px-6 py-10 mt-[-22rem]'>
          {/* Text Section */}
          <h1 className='text-4xl font-bold mb-4'>
            A Low-GI Rice
          </h1>
          <h2 className='text-2xl mb-4'>
            So Clean. So Tasty. So Healthy.
          </h2>
          <Link to='/shop'>
          <button className='bg-green-700 text-xl text-white py-2 px-8 rounded-full hover:bg-green-600 transition-all'>
            Shop now
          </button>
          </Link>
          <p className='text-xl font-bold mt-2'>
            From ₹159
          </p>
        </div>
      </div>
    </section>
  );
}
