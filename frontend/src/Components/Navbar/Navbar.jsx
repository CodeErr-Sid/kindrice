import React, { useState } from 'react';
import { assets } from '../../assets/assets';
import './Navbar.css'; // Ensure the path is correct
import { FaUser, FaShoppingCart, FaBars, FaTimes } from 'react-icons/fa'; // Import icons
import { Link } from 'react-router-dom'; // Import Link from react-router-dom

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <section className='navbar-section'>
      <div className="navbar-container">
        {/* Hamburger Icon */}
        <div className={`hamburger ${isMenuOpen ? 'active' : ''}`} onClick={toggleMenu}>
          <FaBars />
        </div>

        <div className='navbar-logo'>
          <img src={assets.logo} alt='brand-logo' />
        </div>

        <div className={`navbar-menu-container ${isMenuOpen ? 'active' : ''}`}>
          <div className={`navbar-menu ${isMenuOpen ? 'active' : ''}`}>
            <ul>
            <li><Link to='/shop' className='link' style={{ marginLeft: '9rem' }}>Shop</Link></li>
              <li><Link to='/low-gi' className='link'>Low GI</Link></li>
              <li><Link to='/impact' className='link'>Impact</Link></li>
              <li><Link to='/blog' className='link'>Blog</Link></li>
              <li><Link to='/story' className='link'>Story</Link></li>
              <li><Link to='/contact' className='link'>Contact</Link></li>
              <li><Link to='/lab-test' className='link'>Lab Test</Link></li>
            </ul>
          </div>
          <div className='navbar-icons'>
            <FaUser className='icon user' />
            <FaShoppingCart className='icon cart' />
          </div>
        </div>
      </div>

      {/* Fullscreen Menu Overlay */}
      <div className={`overlay ${isMenuOpen ? 'active' : ''}`}>
        <div className="overlay-content">
          <FaTimes className='close-icon' onClick={toggleMenu} /> {/* Close icon */}
          <ul>
            <li><Link to='/shop' className='link' onClick={toggleMenu}>Shop</Link></li>
            <li><Link to='/low-gi' className='link' onClick={toggleMenu}>Low GI</Link></li>
            <li><Link to='/impact' className='link' onClick={toggleMenu}>Impact</Link></li>
            <li><Link to='/blog' className='link' onClick={toggleMenu}>Blog</Link></li>
            <li><Link to='/story' className='link' onClick={toggleMenu}>Story</Link></li>
            <li><Link to='/contact' className='link' onClick={toggleMenu}>Contact</Link></li>
            <li><Link to='/lab-test' className='link' onClick={toggleMenu}>Lab Test</Link></li>
          </ul>
        </div>
      </div>
    </section>
  );
}
