import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import Home from './pages/Home/Home';
import Story from './pages/Story/Story';
import Impact from './pages/Impact/Impact';
import Blog from './pages/Blog/Blog';
import Lowgi from './pages/Lowgi/Lowgi';
import Contact from './pages/Contact/Contact';
import ReturnPolicy from './pages/ReturnPolicy/ReturnPolicy';
import Certificates from './pages/Certificates/Certificates';
import Home2 from './pages/Home2/Home2';


function App() {
  return (
    <Router>
      <Routes>
        {/* <Route path='/home2' element={<Home2 />} /> */}
        <Route path='/' element={<Home2 />} />
        <Route path='/story' element={<Story />} />
        <Route path='/impact' element={<Impact/>} />
        <Route path='/blog' element={<Blog/>} />
        <Route path='/low-gi' element={<Lowgi/>} />
        <Route path='/contact' element={<Contact/>} />
        <Route path="/return-policy" element={<ReturnPolicy/>}/>
        <Route path="/lab-test" element={<Certificates/>}/>
      </Routes>
    </Router>
  );
}

export default App;
