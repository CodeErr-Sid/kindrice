import React from 'react'
import Navbar from '../../Components/Navbar/Navbar'
import LowgiHero from '../../Components/lowgi-hero/LowgiHero'
import Example from '../../Components/Example/Example'
import LowGlycemic from '../../Components/LowGlycemic/LowGlycemic'
import Howitworks from '../../Components/Howitworks/Howitworks'
import Howlowgi from '../../Components/Howlowgi/Howlowgi'
import Whyitmatters from '../../Components/Whyitmatters/Whyitmatters'
import VerifiedCertificate from '../../Components/Verified-Cerificate/VerifiedCertificate'
import Tagline from '../../Components/Lowgi-tagline/Tagline'
import Preloader from '../../Components/Preloader/Preloader'
import Footer2 from '../../Components/Footer2/Footer'
import { assets } from '../../assets/assets'
import KindLowGi from '../../Components/KindLowGi/KindLowGi';


export default function Lowgi() {
  return (
    <>
    {/* <Preloader/> */}
    <Navbar/>
    <LowgiHero/>
    <Example/>
    {/* <LowGlycemic/> */}
    <Howitworks/>
    <Howlowgi/>
    <Whyitmatters/>
    <VerifiedCertificate/>
    <KindLowGi
        imageSrc={assets.rice5}
        title="Kind Low-GI Rice"
        description="So Clean, So Tasty, So Healthy"
        price="From ₹210" style={{margin:'3rem 0'}}
      />
    <Footer2/>
    </>
  )
}
