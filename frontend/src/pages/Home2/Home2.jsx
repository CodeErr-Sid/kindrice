import React from 'react'
import Navbar from '../../Components/Navbar/Navbar'
import Herosection from '../../Components/Hero-section/Herosection'
import Yoga2 from '../../Components/Yoga2/Yoga2'
import HealthyPartner from '../../Components/Healthy-Partner/HealthyPartner'
// import Labtest from '../../Components/Lab-test/Labtest'
// import HealthyRice from '../../Components/Healthy-rice/HealthyRice'
// import Promise from '../../Components/promises/Promise'
import Management from '../../Components/Weight-Management/Management'
import Philosophy from '../../Components/Philosophy/Philosophy'
import Truth from '../../Components/Truth/Truth'
import Table from '../../Components/Table/Table'
// import Yoga from '../../Components/Yoga/Yoga'
import Kind from '../../Components/kind/Kind'
import KindLowGi from '../../Components/KindLowGi/KindLowGi'
import Footer from '../../Components/Footer/Footer'
import Labtest2 from '../../Components/Lab-test/Labtest2'
import Healthyrice2 from '../../Components/Healthy-rice/Healthyrice2'
import Promise2 from '../../Components/promises/Promise2'
import Preloader from '../../Components/Preloader/Preloader'
import KindLoader from '../../Components/KindLoader/KindLoader'



export default function Home2() {
  return (
    <>
    <KindLoader/>
    {/* <Preloader/> */}
    <Navbar/>
    <Herosection/>
    <Yoga2/>
    <HealthyPartner/>
    <Labtest2/>
    <Healthyrice2/>
    <Promise2/>
    <Management/>
    <Philosophy/>
    <Truth/>
    <Table/>
    <Kind/>
    <KindLowGi/>
    <Footer/>
    </>
  )
}
