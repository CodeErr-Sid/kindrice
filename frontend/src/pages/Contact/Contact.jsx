import React from 'react'
import Navbar from '../../Components/Navbar/Navbar'
import ContactHero from '../../Components/Contact-hero/ContactHero'
import ContactForm from '../../Components/ContactForm/ContactForm'
import Footer from '../../Components/Footer/Footer'

export default function Contact() {
  return (
   <>
   <Navbar/>
   <ContactHero/>
    <ContactForm/>
    <Footer/>
   </>
  )
}
