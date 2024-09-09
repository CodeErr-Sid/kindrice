import React from 'react'
import Navbar from '../../Components/Navbar/Navbar'
import Footer from '../../Components/Footer/Footer'
import ThreeSections from '../../Components/Blog-3-sections/ThreeSections'
import Blogcards from '../../Components/Blog-Cards/Blogcards'
import Pagination from '../../Components/Pagination/Pagination'
import Publication from '../../Components/Publications/Publication'
import { assets } from '../../assets/assets'
import Preloader from '../../Components/Preloader/Preloader'



const cardsData = [
  {
    image: assets.friedrice,
    title: ' Creative and Delicious Recipes Using Kind Rice',
    details: '',
  },
  {
    image: assets.glycemic,
    title: ' Understanding Glycemic Index: What It Means for Your Health',
    details: '',
  },
  {
    image: assets.diet,
    title: 'The Benefits of Low-GI Foods: Why Kind Rice Should Be Part of Your Diet',
    details: '',
  },
];

export default function Blog() {
  return (
   <>
   <Preloader/>
   <Navbar/>
   <ThreeSections/>
   <Blogcards/>
   {/* <Pagination/> */}
   <Publication cards={cardsData} />
   <Footer/>
   </>
  )
}
