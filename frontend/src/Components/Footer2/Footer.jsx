import React, { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./Footer.css";
import { assets } from "../../assets/assets";
import { Link } from "react-router-dom";
import { Helmet } from 'react-helmet';


const Footer2 = () => {

  return (
    <footer>
      <Helmet>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
        />
      </Helmet>
      <div className="footer-container">
        <div className="footer-section footer-content-left foot">
          <div className="logo">
            <img src={assets.letterLogo} alt="Logo" />
          </div>
          <p>contact@Kindrice.in</p>
          <p className="ph-no">+91 98432 97474</p>
        </div>
     
        <div className="footer-section footer-content-left2">
        <div className="place">
            <img src={assets.place} alt="" />
            <h2>PROUDLY MADE IN MADURAI</h2>
      
          </div>

          
        </div>
        <div className="footer-section babyfoot">
          <h3>Connect With Us</h3>
          <div className="social-links">
            <a href="#" target="_blank" aria-label="Facebook">
              <i className="fab fa-facebook-f"></i>
            </a>
            <a href="#" target="_blank" aria-label="Twitter">
              <i className="fab fa-twitter"></i>
            </a>
            <a href="#" target="_blank" aria-label="LinkedIn">
              <i className="fab fa-linkedin-in"></i>
            </a>
            <a href="https://www.instagram.com/braaishack/" target="_blank" aria-label="Instagram">
              <i className="fab fa-instagram"></i>
            </a>
          </div>
          <div className="newsletter">
            <h4>Subscribe to Our Newsletter</h4>
            <form>
              <input
                type="email"
                placeholder="Your Email"
                aria-label="Email for newsletter"
              />
              <button type="submit">Subscribe</button>
            </form>
          </div>
        </div>
      </div>
      {/* <div className="footer-bottom">
        <p>&copy; 2024 Kind Rice. All rights reserved.</p>
        <a href="#" className="back-to-top" aria-label="Back to top">
          <i className="fas fa-chevron-up"></i>
        </a>
      </div> */}
    </footer>
  );
};

export default Footer2;
