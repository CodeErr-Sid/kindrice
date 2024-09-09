import React from 'react'
import Navbar from '../../Components/Navbar/Navbar'
import CertificateHero from '../../Components/Certificate-hero/CertificateHero'
import CertificatesImages from '../../Components/Certificates-image/CertificatesImages'

import Preloader from '../../Components/Preloader/Preloader'
import Footer2 from '../../Components/Footer2/Footer'

export default function Certificates() {
  return (
    <>
    {/* <Preloader/> */}
    <Navbar/>
    <CertificateHero/>
    <CertificatesImages/>
    <Footer2/>
    </>
  )
}
