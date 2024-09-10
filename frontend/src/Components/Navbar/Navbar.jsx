import React, { useContext, useState } from 'react';
import { assets } from '../../assets/assets';
import './Navbar.css';
import { FaUser, FaShoppingCart, FaBars, FaTimes } from 'react-icons/fa';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { logout } from "../../config/firebase";
import Menuactive from './Menuactive';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showLogout, setShowLogout] = useState(false);
  const { isLoggedIn, cart } = useContext(AuthContext);

  const navigate = useNavigate();
  const location = useLocation();
  const currentPath = location.pathname;

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const toggleLogout = () => setShowLogout(!showLogout);

  const handleLogout = async () => {
    await logout();
    toggleLogout();
  }

  const handleProfile = () => {
    if (isLoggedIn) {
      toggleLogout();
    } else {
      navigate('/login', { state: { from: location.pathname } });
    }
  }

  return (
    <section className='navbar-section'>
      <div className="navbar-container">
        <div className={`hamburger ${isMenuOpen ? 'active' : ''}`} onClick={toggleMenu}>
          <FaBars />
        </div>

        <div className='navbar-logo'>
          <img src={assets.kindl} alt='brand-logo' />
        </div>

        <div className={`navbar-menu-container ${isMenuOpen ? 'active' : ''}`}>
          <div className={`navbar-menu ${isMenuOpen ? 'active' : ''}`}>
            <ul>
              {currentPath !== '/' && <li><Link to='/' className='link'>Home</Link></li>}
              <li><Link to='/shop' className='link'>Shop</Link></li>
              <li><Link to='/low-gi' className='link'>Low GI</Link></li>
              <li><Link to='/impact' className='link'>Impact</Link></li>
              <li><Link to='/blog' className='link'>Blog</Link></li>
              <li><Link to='/story' className='link'>Story</Link></li>
              <li><Link to='/contact' className='link'>Contact</Link></li>
              <li><Link to='/lab-test' className='link'>Lab Test</Link></li>
            </ul>
          </div>
          <div className='navbar-icons'>
            <div className="login-button relative">
              <FaUser className='icon user' onClick={handleProfile} />
              {isLoggedIn && showLogout && <button
                className='absolute right-1/2 top-[113%] translate-x-1/2 bg-[#006634] text-white rounded-xl text-xl px-[5px] py-[10px]'
                onClick={handleLogout}
              >Logout</button>}
            </div>
            <FaUser className='icon user user2' />
            <div className="cart-icon-container relative">
              <FaShoppingCart className='icon cart' onClick={() => navigate("/cart")} />
              <div className="cart-quantity-alert hidden absolute bg-green-950 rounded-2xlabsolute top-[-10px] right-[-10px] bg-gradient-to-br from-green-500 to-green-900 text-white font-medium rounded-full w-[18px] h-[18px] md:flex items-center justify-center text-[13px] p-0" onClick={() => navigate("/cart")}>
                {cart ? cart.reduce((sum, item) => sum + item.quantity, 0) : 0}
              </div>
            </div>
          </div>
        </div>

        <div className={`overlay ${isMenuOpen ? 'active' : ''}`}>
          <div className="overlay-content">
            <FaTimes className='close-icon' onClick={toggleMenu} />
            <ul>
              <img src={assets.kindl} alt='' className='w-20 h-auto mb-6'  />
              {currentPath !== '/' && <li><Link to='/' className='link' onClick={toggleMenu}>Home</Link></li>}
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
      </div>

      {/* Fullscreen Menu Overlay */}
      {/* <Menuactive show={isMenuOpen} /> */}
    </section>
  );
}
