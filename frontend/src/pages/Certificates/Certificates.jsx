import React from 'react'
import Navbar from '../../Components/Navbar/Navbar'
import CertificateHero from '../../Components/Certificate-hero/CertificateHero'
import CertificatesImages from '../../Components/Certificates-image/CertificatesImages'
import Footer from '../../Components/Footer/Footer'
import Preloader from '../../Components/Preloader/Preloader'

export default function Certificates() {
  return (
    <>
    {/* <Preloader/> */}
    <Navbar/>
    <CertificateHero/>
    <CertificatesImages/>
    <Footer/>
    </>
  )
}
