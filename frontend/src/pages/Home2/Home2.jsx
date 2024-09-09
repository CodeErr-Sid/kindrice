import React, { useState, useEffect } from 'react'
import Navbar from '../../Components/Navbar/Navbar'
import Herosection from '../../Components/Hero-section/Herosection'
import Yoga2 from '../../Components/Yoga2/Yoga2'
import HealthyPartner from '../../Components/Healthy-Partner/HealthyPartner'
import Management from '../../Components/Weight-Management/Management'
import Philosophy from '../../Components/Philosophy/Philosophy'
import Truth from '../../Components/Truth/Truth'
import Table from '../../Components/Table/Table'
import Kind from '../../Components/kind/Kind'
import KindLowGi from '../../Components/KindLowGi/KindLowGi'
import Footer from '../../Components/Footer/Footer'
import Labtest2 from '../../Components/Lab-test/Labtest2'
import Healthyrice2 from '../../Components/Healthy-rice/Healthyrice2'
import Promise2 from '../../Components/promises/Promise2'
import Preloader from '../../Components/Preloader/Preloader'
import KindLoader from '../../Components/KindLoader/KindLoader'

export default function Home2() {
  const [showKindLoader, setShowKindLoader] = useState(false)
  const [showPreloader, setShowPreloader] = useState(false)

  useEffect(() => {
    // Check if KindLoader has already been shown using localStorage
    const hasShownKindLoader = localStorage.getItem('hasShownKindLoader')

    if (!hasShownKindLoader) {
      setShowKindLoader(true)
      // After KindLoader runs, mark it as shown in localStorage
      setTimeout(() => {
        setShowKindLoader(false)
        localStorage.setItem('hasShownKindLoader', 'true')
        setShowPreloader(true) // Show preloader after KindLoader finishes
      }, 3000) // Set the duration of KindLoader
    } else {
      // If KindLoader has been shown, directly show the Preloader
      setShowPreloader(true)
    }
  }, [])

  return (
    <>
      {showKindLoader && <KindLoader />}
      {showPreloader && <Preloader />}
      {!showKindLoader && (
        <>
          <Navbar />
          <Herosection />
          <Yoga2 />
          <HealthyPartner />
          <Labtest2 />
          <Healthyrice2 />
          <Promise2 />
          <Management />
          <Philosophy />
          <Truth />
          <Table />
          <Kind />
          <KindLowGi />
          <Footer />
        </>
      )}
    </>
  )
}
