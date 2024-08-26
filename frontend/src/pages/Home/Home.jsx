import React from 'react'
import Navbar from '../../Components/Navbar/Navbar'
import Herosection from '../../Components/Hero-section/Herosection'
import Hometwo from '../../Components/second-section/Hometwo'
import HealthyPartner from '../../Components/Healthy-Partner/HealthyPartner'
import Labtest from '../../Components/Lab-test/Labtest'
import HealthyRice from '../../Components/Healthy-rice/HealthyRice'
import Promise from '../../Components/promises/Promise'
import Management from '../../Components/Weight-Management/Management'
import ImagesSection from '../../Components/images-sections/Images.section'
import Yoga from '../../Components/Yoga/Yoga'
import Footer from '../../Components/Footer/Footer'


export default function Home() {
  return (
<>
<Navbar/>
<Herosection/>
<Hometwo/>
<HealthyPartner/>
<Labtest/>
<HealthyRice/>
<Promise/>
<Management/>
<ImagesSection/>
<Yoga/>
<Footer/>
</>
  )
}
