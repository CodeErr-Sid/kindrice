// App.jsx
import React from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
// Import your page components
import Story from './pages/Story/Story';
import Shop from './pages/Shop/Shop';
import Impact from './pages/Impact/Impact';
import Blog from './pages/Blog/Blog';
import Lowgi from './pages/Lowgi/Lowgi';
import Contact from './pages/Contact/Contact';
import ReturnPolicy from './pages/ReturnPolicy/ReturnPolicy';
import Certificates from './pages/Certificates/Certificates';
import Home2 from './pages/Home2/Home2';
import { FloatingWhatsApp } from 'react-floating-whatsapp';
import { assets } from './assets/assets';
import ScrollToTop from './Components/ScrollToTop/ScrollToTop';
import Auth from './pages/Auth/Auth';

function App() {
  const location = useLocation();

  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/login" element={<Auth />} />
        <Route path="/shop" element={<Shop />} />
        <Route path='/' element={<Home2 />} />
        <Route path='/story' element={<Story />} />
        <Route path='/impact' element={<Impact />} />
        <Route path='/blog' element={<Blog />} />
        <Route path='/low-gi' element={<Lowgi />} />
        <Route path='/contact' element={<Contact />} />
        <Route path="/return-policy" element={<ReturnPolicy />} />
        <Route path="/lab-test" element={<Certificates />} />
      </Routes>
      {location.pathname !== '/login' && (
        <FloatingWhatsApp
          phoneNumber="+91 98432 97474"
          allowClickAway
          chatMessage="Hi there, How can we help you"
          statusMessage="CEO of Kindrice"
          accountName="Kishore Jeyachandran"
          avatar={assets.w_profile}
        />
      )}
    </>
  );
}

export default App;
