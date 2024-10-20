import React, { useContext, useEffect, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./Footer.css";
import { assets } from "../../assets/assets";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { toast } from 'react-toastify';
import { subscribeToEmail } from "../../api/userapi";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";



const Footer2 = () => {

  const { url } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent page reload

    const data = await subscribeToEmail(email, url);

    if (data.success) {
      toast.success(data.message);
    } else {
      toast.warn(data.error);
    }
    setEmail("");
  }

  return (
    <HelmetProvider>
      <footer className="kr-footer">
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
            {/* <p>contact@Kindrice.in</p>
          <p className="ph-no">+91 98432 97474</p> */}
            <ul>
              {/* <li>
              <Link to="/">
                <i className="fas fa-caret-right"></i> Home
              </Link>
            </li> */}
              <li>
                <Link to="/story">
                  <i className="fas fa-caret-right"></i> Story
                </Link>
              </li>

              <li>
                <Link to="/low-gi">
                  <i className="fas fa-caret-right"></i> Low-Gi Rice
                </Link>
              </li>
              <li>
                <Link to="/Blog">
                  <i className="fas fa-caret-right"></i> Blog
                </Link>
              </li>
              <li>
                <Link to="/Impact">
                  <i className="fas fa-caret-right"></i> Impact
                </Link>
              </li>
              <li>
                <Link to="/lab-test">
                  <i className="fas fa-caret-right"></i> Lab-Reports
                </Link>
              </li>
              <li>
                <Link to="/return-policy">
                  <i className="fas fa-caret-right"></i> Shipping & Returns Policy
                </Link>
              </li>
              <li>
                <a href="/privacy_policy.html">
                  <i className="fas fa-caret-right"></i> Privacy Policy
                </a>
              </li>
              <li>
                <Link to="/terms-and-conditions">
                  <i className="fas fa-caret-right"></i> Terms & Conditions
                </Link>
              </li>
              <li>
                <Link to="/contact">
                  <i className="fas fa-caret-right"></i> Contact Us
                </Link>
              </li>
            </ul>
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
              <a href="https://www.instagram.com/kindrice.co?igsh=MXExa3JseWxvMDliaw%3D%3D&utm_source=qr"
                target="_blank" aria-label="Instagram">
                <i className="fab fa-instagram"></i>
              </a>
              <a href="https://www.facebook.com/share/Zxd1qe9YRgzQqA7e/?mibextid=LQQJ4d"
                target="_blank" aria-label="Facebook">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="https://www.linkedin.com/company/kind-rice/"
                target="_blank" aria-label="LinkedIn">
                <i className="fab fa-linkedin-in"></i>
              </a>
              <a href="https://www.youtube.com/@kindrice"
                target="_blank" aria-label="YouTube">
                <i className="fab fa-youtube"></i>
              </a>
              <a href="https://x.com/RiceKind83063"
                target="_blank" aria-label="X (Twitter)">
                <i className="fa-brands fa-x-twitter"></i>
              </a>

            </div>
            <div className="newsletter">
              <h4>Subscribe to Our Newsletter</h4>
              <form onSubmit={handleSubmit}>
                <input
                  name="email"
                  type="email"
                  placeholder="Your Email"
                  aria-label="Email for newsletter"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  style={{ color: 'black' }}
                  required
                />
                <button type="submit">Subscribe</button>
              </form>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <p className="text-xs md:text-sm ">&copy; 2024 R.K. Brothers Agro Foods Pvt. Ltd All rights reserved.</p>
          {/* <a href="#" className="back-to-top" aria-label="Back to top">
          <i className="fas fa-chevron-up"></i>
        </a> */}
        </div>
      </footer>
    </HelmetProvider>
  );
}

export default Footer2;
