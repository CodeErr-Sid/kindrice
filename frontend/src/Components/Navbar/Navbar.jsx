import React, { useContext, useEffect, useState } from 'react';
import { assets } from '../../assets/assets';
import './Navbar.css';
import { FaUser, FaShoppingCart, FaBars, FaTimes } from 'react-icons/fa';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import kindricesvglogo from '/Kind_rice_logotype.svg'
import { AuthContext } from '../../context/AuthContext';
import { logout } from "../../config/firebase";
import { faX } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'


export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showLogout, setShowLogout] = useState(false);
  const { isLoggedIn, cart } = useContext(AuthContext);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  const navigate = useNavigate();
  const location = useLocation();
  const currentPath = location.pathname;

  // Hide navbar on /checkout and /cart pages
  const isCheckoutOrCartPage = currentPath === '/checkout' || currentPath === '/cart';

  useEffect(() => {
    const handleScroll = () => {
      if (window.innerWidth <= 768 && isCheckoutOrCartPage) {
        return; // Exit early if on /checkout or /cart pages and screen width is less than 768px
      }

      const currentScrollPos = window.pageYOffset;
      const dummySection = document.querySelector('.dummy-section');
      const dummySectionBottom = dummySection?.getBoundingClientRect().bottom;

      if (dummySectionBottom <= 0) {
        if (currentScrollPos > scrollPosition) {
          setIsVisible(false); // Hide navbar when scrolling down
        } else {
          setIsVisible(true);  // Show navbar when scrolling up
        }
        setScrollPosition(currentScrollPos);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [scrollPosition, isCheckoutOrCartPage]);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const toggleLogout = () => setShowLogout(!showLogout);

  const handleLogout = async () => {

    await logout();
    toggleLogout();
    if (location.pathname === '/cart' || location.pathname === '/checkout') {
      // Redirect to the shop page
      navigate('/shop');
    } else {
      navigate(0);
    }
  };

  const handleProfile = () => {
    if (isLoggedIn) {
      console.log("hi")
      toggleLogout();
    } else {
      navigate('/login', {
        state: {
          redirectToCheckout: false
        }
      })
    }
  };

  return (
    <section className='navbar-section md:overflow-visible'>
      <div className="dummy-section px-0 pt-6 pb-[1vw]">
        {/* This section will always be visible */}
        <div className={`hamburger ${isMenuOpen ? 'active' : ''}`} onClick={toggleMenu}>
          <FaBars />
        </div>
        <Link to='/'>
          <div className='navbar-logo'>
            <img src={kindricesvglogo} alt='brand-logo' />
          </div>
        </Link>
        <div className={`navbar-menu-container ${isMenuOpen ? 'active' : ''}`}>
          <div className={`navbar-menu overlay ${isMenuOpen ? 'active' : ''}`}>
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
            <FontAwesomeIcon onClick={toggleMenu} className='md:hidden absolute top-4 right-4 text-2xl' icon={faX} style={{ color: "#005922", }} />
          </div>

          <div className='navbar-icons'>
            <div className="login-button relative">
              <FaUser className='icon user cursor-pointer' onClick={handleProfile} />
              {isLoggedIn && showLogout && (
                <button
                  className='absolute hidden md:block right-1/2 top-[113%] translate-x-1/2 bg-[#006634] text-white rounded-xl text-xl px-[5px] py-[10px]'
                  onClick={handleLogout}
                >
                  Logout
                </button>
              )}
            </div>
            <FaUser className='icon user user2' onClick={handleProfile} />
            {isLoggedIn && showLogout && (
              <button
                className='absolute block md:hidden right-[45px] top-[73px] translate-x-1/2 bg-[#006634] text-white rounded-xl text-xl px-[5px] py-[10px]'
                onClick={handleLogout}
              >
                Logout
              </button>
            )}
            {isLoggedIn && <div className="cart-icon-container relative">
              <FaShoppingCart className='icon cart cursor-pointer' onClick={() => navigate("/cart")} />
              <div className="cart-quantity-alert hidden absolute bg-green-950 rounded-2xlabsolute top-[-10px] right-[-10px] bg-gradient-to-br from-green-500 to-green-900 text-white font-medium rounded-full w-[18px] h-[18px] md:flex items-center justify-center text-[13px] p-0" onClick={() => navigate("/cart")}>
                {cart ? cart.reduce((sum, item) => sum + item.quantity, 0) : 0}
              </div>
            </div>}
            {isLoggedIn &&
              <>
                <FaShoppingCart className='icon cart cursor-pointer block md:hidden' onClick={() => navigate("/cart")} />
                <div className="cart-quantity-alert flex md:hidden absolute bg-green-950 rounded-2xlabsolute top-[39px] right-[43px] bg-gradient-to-br from-green-500 to-green-900 text-white font-medium rounded-full w-[18px] h-[18px]  items-center justify-center text-[13px] p-0" onClick={() => navigate("/cart")}>
                  {cart ? cart.reduce((sum, item) => sum + item.quantity, 0) : 0}
                </div>
              </>}
          </div>
        </div>
      </div>

      {/* Conditionally hide the navbar-container on /checkout and /cart */}
      {!isCheckoutOrCartPage && (
        <div className={`navbar-container ${isVisible ? 'nav-visible' : 'nav-hidden'}`}>
          {/* Hamburger and Menu */}
          <div className={`hamburger ${isMenuOpen ? 'active' : ''}`} onClick={toggleMenu}>
            <FaBars />
          </div>

          <Link to="/">
            <div className='navbar-logo'>
              <img src={kindricesvglogo} alt='brand-logo' />
            </div>
          </Link>

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
                <FaUser className='icon user cursor-pointer' onClick={handleProfile} />
                {isLoggedIn && showLogout && (
                  <button
                    className='absolute hidden md:block right-1/2 top-[113%] translate-x-1/2 bg-[#006634] text-white rounded-xl text-xl px-[5px] py-[10px]'
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                )}
              </div>
              <FaUser className='icon user user2' onClick={handleProfile} />
              {isLoggedIn && showLogout && (
                <button
                  className='absolute block md:hidden right-[45px] top-[73px] translate-x-1/2 bg-[#006634] text-white rounded-xl text-xl px-[5px] py-[10px]'
                  onClick={handleLogout}
                >
                  Logout
                </button>
              )}
              {isLoggedIn && <div className="cart-icon-container relative">
                <FaShoppingCart className='icon cart cursor-pointer' onClick={() => navigate("/cart")} />
                <div className="cart-quantity-alert hidden absolute bg-green-950 rounded-2xlabsolute top-[-10px] right-[-10px] bg-gradient-to-br from-green-500 to-green-900 text-white font-medium rounded-full w-[18px] h-[18px] md:flex items-center justify-center text-[13px] p-0" onClick={() => navigate("/cart")}>
                  {cart ? cart.reduce((sum, item) => sum + item.quantity, 0) : 0}
                </div>
              </div>}
              {isLoggedIn &&
                <>
                  <FaShoppingCart className='icon cart cursor-pointer block md:hidden' onClick={() => navigate("/cart")} />
                  <div className="cart-quantity-alert flex md:hidden absolute bg-green-950 rounded-2xlabsolute top-[39px] right-[43px] bg-gradient-to-br from-green-500 to-green-900 text-white font-medium rounded-full w-[18px] h-[18px]  items-center justify-center text-[13px] p-0" onClick={() => navigate("/cart")}>
                    {cart ? cart.reduce((sum, item) => sum + item.quantity, 0) : 0}
                  </div>
                </>}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
