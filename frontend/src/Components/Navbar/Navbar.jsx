import React, { useState } from 'react';
import { assets } from '../../assets/assets';
import './Navbar.css'; // Ensure the path is correct
import { FaUser, FaShoppingCart, FaBars } from 'react-icons/fa'; // Import hamburger icon
import { Link } from 'react-router-dom'; // Import Link from react-router-dom for page navigation

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
    </section>
  );
}
