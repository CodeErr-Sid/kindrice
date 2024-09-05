import React from 'react'
import CartContainer from '../../Components/CartContainer/CartContainer'
import Navbar from '../../Components/Navbar/Navbar'
import Footer from '../../Components/Footer/Footer'
import ShopBanner from '../../Components/ShopBanner/ShopBanner'

const Cart = () => {
  return (
    <>
    <Navbar/>
    <ShopBanner title="Cart" address="Home/Cart" />
    <CartContainer/>
    <Footer/>
    </>
  )
}

export default Cart