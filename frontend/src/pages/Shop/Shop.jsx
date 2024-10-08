import React, { useState } from 'react'
import Navbar from '../../Components/Navbar/Navbar'
import ShopBanner from '../../Components/ShopBanner/ShopBanner'
import ShopBowl from '../../Components/ShopBowl/ShopBowl'
import Product from '../../Components/Product/Product'
import { assets } from '../../assets/assets'
import FullTransparency from '../../Components/FullTransparency/FullTransparency'
import GotQuestions from '../../Components/GotQuestions/GotQuestions'
import Preloader from '../../Components/Preloader/Preloader'
import KindLoader from '../../Components/KindLoader/KindLoader'
import Footer2 from '../../Components/Footer2/Footer'



const Shop = () => {

  const productId = import.meta.env.VITE_LOWGIRICE_PRODUCT_ID;

  return (
    <>
    {/* <Preloader/> */}
      <Navbar />
      {/* <ShopBanner title="Online Shop" address="Home/Shop" /> */}
        {/* <img className='absolute z-[-1] right-0 top-40 flex' src={assets.bgcircle} alt="" /> */}
        <ShopBowl title='Shop'/>
        <Product productId={productId}/>
        <FullTransparency/>
        <GotQuestions/>
  
      <Footer2 />
    </>
  )
}

export default Shop