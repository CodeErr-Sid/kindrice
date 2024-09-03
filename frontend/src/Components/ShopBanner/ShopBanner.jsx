import React from 'react'
import './ShopBanner.css'
const ShopBanner = ({ title, address }) => {
  return (
    <section className='banner-outer-section'>
        <div className="banner-container">
        <h1 className="banner-name">{title}</h1>
        {address && (
          <button className="banner-address hidden md:block ">
            {address}
          </button>
        )}
        </div>
    </section>
  )
}

export default ShopBanner