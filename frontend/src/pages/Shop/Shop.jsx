import React from 'react'
import Navbar from '../../Components/Navbar/Navbar'
import Footer from '../../Components/Footer/Footer'
import ShopBanner from '../../Components/ShopBanner/ShopBanner'
import ShopBowl from '../../Components/ShopBowl/ShopBowl'
import Product from '../../Components/Product/Product'
import { assets } from '../../assets/assets'

const Shop = () => {
  return (
    <>
      <Navbar />
      <ShopBanner />
      <section className="relative">
      <img className='absolute z-[-1] right-0 top-40' src={assets.bgcircle} alt="" />
        <ShopBowl />
        <Product />
      </section>
      <Footer />
    </>
  )
}

export default Shop