import React from 'react'
import './Impact.css'
import Navbar from '../../Components/Navbar/Navbar'
import ImpactSecond from '../../Components/impact-second-sec/ImpactSecond'
import Impacthero from '../../Components/Impact-hero.jsx/Impact-hero'
import { assets } from '../../assets/assets'
import Vision from '../../Components/Vision/Vision'
import Tagline from '../../Components/Impact-tagline/Tagline'
import Footer from '../../Components/Footer/Footer'

export default function Impact() {
    const paragraphHtml1 = `Kind Rice proudly sources its cotton bags from Carefactory, where <span>people with mental illness meticulously craft each bag.</span> <br/> <br/>By choosing Kind Rice, you <span>support meaningful employment and a supportive community.</span>`;

    const paragraphHtml2 = `We do our best to <span>procure paddy directly from farmers.</span> Nowadays, most paddy is purchased from brokers, where middlemen gain more profit and farmers are not paid fairly.
<br/><br/>
By <span>procuring directly from farmers,</span> we ensure they <span>receive a fair price</span> and <span>support their livelihood<span/>  how to add span this in props.
    `;
    const paragraphHtml3 = `Nowadays, rice packaged in plastic bags. We want to change this to<span>protect our planet.</span> <br/><br/> We will <span>pack all our rice in cotton bags using only food-grade ink.</span> Our packaging will be completely plastic-free.`
  return (
    <>
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
    <Footer/>
    </>
  )
}
