import React from 'react'
import Navbar from '../../Components/Navbar/Navbar'
import ContactHero from '../../Components/Contact-hero/ContactHero'
import ContactForm from '../../Components/ContactForm/ContactForm'
import Footer from '../../Components/Footer/Footer'
import Preloader from '../../Components/Preloader/Preloader'

export default function Contact() {
  return (
   <>
   <Preloader/>
   <Navbar/>
   <ContactHero/>
    <ContactForm/>
    <Footer/>
   </>
  )
}
