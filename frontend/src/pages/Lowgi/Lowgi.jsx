import React from 'react'
import Navbar from '../../Components/Navbar/Navbar'
import Footer from '../../Components/Footer/Footer'
import LowgiHero from '../../Components/lowgi-hero/LowgiHero'
import Example from '../../Components/Example/Example'
import LowGlycemic from '../../Components/LowGlycemic/LowGlycemic'
import Howitworks from '../../Components/Howitworks/Howitworks'
import Howlowgi from '../../Components/Howlowgi/Howlowgi'
import Whyitmatters from '../../Components/Whyitmatters/Whyitmatters'
import VerifiedCertificate from '../../Components/Verified-Cerificate/VerifiedCertificate'
import Tagline from '../../Components/Lowgi-tagline/Tagline'
import Preloader from '../../Components/Preloader/Preloader'

export default function Lowgi() {
  return (
    <>
    {/* <Preloader/> */}
    <Navbar/>
    <LowgiHero/>
    <Example/>
    <LowGlycemic/>
    <Howitworks/>
    <Howlowgi/>
    <Whyitmatters/>
    <VerifiedCertificate/>
    <Tagline/>
    <Footer/>
    </>
  )
}
