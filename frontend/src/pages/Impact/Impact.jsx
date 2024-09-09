import React from 'react'
import './Impact.css'
import Navbar from '../../Components/Navbar/Navbar'
import ImpactSecond from '../../Components/impact-second-sec/ImpactSecond'
import Impacthero from '../../Components/Impact-hero.jsx/Impact-hero'
import { assets } from '../../assets/assets'
import Vision from '../../Components/Vision/Vision'
import Tagline from '../../Components/Impact-tagline/Tagline'
import Preloader from '../../Components/Preloader/Preloader'
import Footer2 from '../../Components/Footer2/Footer'

export default function Impact() {
    const paragraphHtml1 = `Kind Rice proudly sources its cotton bags from Carefactory, where <span>people living with mental health challenges</span> meticulously craft each bag.
<br/> <br/>By choosing Kind Rice, you support meaningful employment and a supportive community.`;

    const paragraphHtml2 = `We buy paddy <span>directly from farmers,</span> bypassing brokers to ensure <span>fair prices</span> for farmers and support their livelihoods, rather than letting middlemen profit at their expense.
    `;
    const paragraphHtml3 = `We package our rice in <span>cotton bags printed with food-grade ink</span> and then place these bags in sturdy carton boxes. To ensure environmental responsibility, we use water-activated paper tapes instead of plastic transparent tapes for sealing.`;
  return (
    <>
    {/* <Preloader/> */}
    <Navbar/>
    <Impacthero/>
    <ImpactSecond
      logoSrc={assets.kind}
      heartSrc={assets.heart1}
      headingText="to PEOPLE"
     paragraphHtml1={paragraphHtml1}
    />
     <ImpactSecond
      logoSrc={assets.kind}
      heartSrc={assets.heart2}
      headingText="to FARMERS"
      paragraphHtml2={paragraphHtml2}
    />
      <ImpactSecond
      logoSrc={assets.kind}
      heartSrc={assets.heart3}
      headingText="to PLANET"
      paragraphHtml3={paragraphHtml3}
    />
    <Vision/>
    <Tagline/>
    <Footer2/>
    </>
  )
}
