import React from 'react'
import CartContainer from '../../Components/CartContainer/CartContainer'
import Navbar from '../../Components/Navbar/Navbar'
import ShopBanner from '../../Components/ShopBanner/ShopBanner'
import Footer2 from '../../Components/Footer2/Footer'

const Cart = () => {
  return (
    <>
    <Navbar/>
    <ShopBanner title="Cart" address="Home/Cart" />
    <CartContainer/>
    <Footer2/>
    </>
  )
}

export default Cart