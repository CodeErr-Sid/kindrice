import React from 'react'
import Navbar from '../../Components/Navbar/Navbar'
import Footer from '../../Components/Footer/Footer'
import ThreeSections from '../../Components/Blog-3-sections/ThreeSections'
import Blogcards from '../../Components/Blog-Cards/Blogcards'
import Pagination from '../../Components/Pagination/Pagination'
import Publication from '../../Components/Publications/Publication'
import { assets } from '../../assets/assets'



const cardsData = [
  {
    image: assets.friedrice,
    title: '15-minute Low GI Fried Rice',
    details: 'Serves 6 • Cook 10 Min • Prep 5 Min',
  },
  {
    image: assets.chickenCurry,
    title: 'Chicken Curry with Low GI Rice',
    details: 'Serves 6 • Cook 15 Min • Prep 5 Min',
  },
  {
    image: assets.riceSalad,
    title: 'Curried Chicken and Rice Salad',
    details: 'Serves 6 • Cook 10 Min',
  },
];

export default function Blog() {
  return (
   <>
   <Navbar/>
   <ThreeSections/>
   <Blogcards/>
   {/* <Pagination/> */}
   <Publication cards={cardsData} />
   <Footer/>
   </>
  )
}
