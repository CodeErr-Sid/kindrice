import React from 'react'
import './Story.css'
import Navbar from '../../Components/Navbar/Navbar'
import AboutHero from '../../Components/About-hero/AboutHero'
import Thoughts from '../../Components/Thoughts/Thoughts'
import Moment from '../../Components/Moment/Moment'
import Workers from '../../Components/Workers-work/Workers'
import AboutKindrice from '../../Components/About-Kindrice/AboutKindrice'
import Founder from '../../Components/founder/Founder'
import Preloader from '../../Components/Preloader/Preloader'
import Footer2 from '../../Components/Footer2/Footer'


export default function Story() {
  return (
    <>
    {/* <Preloader/> */}
   <Navbar/>
   <AboutHero/>
   <Thoughts/>
   <Moment/>
   <Workers/>
   <AboutKindrice/>
   <Founder/>
   <Footer2/>
   </>
  )
}
