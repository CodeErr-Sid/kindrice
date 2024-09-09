// Home2.jsx
import React from 'react';
import Navbar from '../../Components/Navbar/Navbar';
import Herosection from '../../Components/Hero-section/Herosection';
import Yoga2 from '../../Components/Yoga2/Yoga2';
import HealthyPartner from '../../Components/Healthy-Partner/HealthyPartner';
import Management from '../../Components/Weight-Management/Management';
import Philosophy from '../../Components/Philosophy/Philosophy';
import Truth from '../../Components/Truth/Truth';
import Table from '../../Components/Table/Table';
import Kind from '../../Components/kind/Kind';
import KindLowGi from '../../Components/KindLowGi/KindLowGi';
import Labtest2 from '../../Components/Lab-test/Labtest2';
import Healthyrice2 from '../../Components/Healthy-rice/Healthyrice2';
import Promise2 from '../../Components/promises/Promise2';
import KindLoader from '../../Components/KindLoader/KindLoader';
import Footer2 from '../../Components/Footer2/Footer';
import { assets } from '../../assets/assets';


export default function Home2() {
  return (
    <>
    <KindLoader/>
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
      <KindLowGi
        imageSrc={assets.rice5}
        title="Kind Low GI Rice"
        description="So Clean, So Tasty, So Healthy"
        price="From ₹210"
      />
      <Footer2/>
    </>
  );
}
