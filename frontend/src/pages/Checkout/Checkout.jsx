import React from 'react'
import Navbar from '../../Components/Navbar/Navbar'
import CheckoutContainer from '../../Components/Checkout/CheckoutContainer'
import ShopBanner from '../../Components/ShopBanner/ShopBanner'
import Footer from '../../Components/Footer/Footer'


export default function Checkout() {
  return (
    <>
    <Navbar/>
    <ShopBanner title="Checkout Page" address="Shop/Checkout" />
    <CheckoutContainer/>
    <Footer/>
    </>
  )
}
