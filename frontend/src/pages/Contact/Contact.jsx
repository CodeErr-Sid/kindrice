import React from 'react'
import Navbar from '../../Components/Navbar/Navbar'
import ContactHero from '../../Components/Contact-hero/ContactHero'
import ContactForm from '../../Components/ContactForm/ContactForm'
import Preloader from '../../Components/Preloader/Preloader'
import Footer2 from '../../Components/Footer2/Footer'

export default function Contact() {
  return (
   <>
   {/* <Preloader/> */}
   <Navbar/>
   <ContactHero/>
    <ContactForm/>
    <Footer2/>
   </>
  )
}
