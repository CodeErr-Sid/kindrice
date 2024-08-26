import React from 'react'
import { assets } from '../../assets/assets'
import { FaInstagram, FaFacebookF, FaTwitter, FaLinkedinIn, FaYoutube } from 'react-icons/fa'
import './Footer.css';

export default function Footer() {
  return (
   <section className='footer'>
    <div className='footer__container'>
        <div className="content-up">
        <div className='footer__content_left'>
            <div className='footer__logo'>
            <img src={assets.footerLogo} alt='Footer Logo'/>
            </div>
            <div className='footer__info'>
                <ul>
                    <li>+91 98432 97474</li>
                    <li>contact@Kindrice.in</li>
                    <li>CREATE CHANGE</li>
                    <ul className='social-media'>
                        <li><a href='https://instagram.com' target='_blank' rel='noopener noreferrer'><FaInstagram /></a></li>
                        <li><a href='https://facebook.com' target='_blank' rel='noopener noreferrer'><FaFacebookF /></a></li>
                        <li><a href='https://twitter.com' target='_blank' rel='noopener noreferrer'><FaTwitter /></a></li>
                        <li><a href='https://linkedin.com' target='_blank' rel='noopener noreferrer'><FaLinkedinIn /></a></li>
                        <li><a href='https://youtube.com' target='_blank' rel='noopener noreferrer'><FaYoutube /></a></li>
                    </ul>
                </ul>
      
            </div>
        </div>
        <div className='footer__content_right'>
        <div className='footer__logo'>
            <img src={assets.letterLogo} alt='Letter Logo'/>
            </div>
            <div className="footer-links">
                <ul>
                    <li><a href='#'>SHOP</a></li>
                    <li><a href='#'>STORY</a></li>
                    <li><a href='#'>BLOG</a></li>
                    <li><a href='#'>CONTACT</a></li>
                    <li><a href='#'>IMPACT</a></li>
                    <li><a href='#'>RETURN & POLICIES</a></li>
                    <li><a href='#'>CERTIFICATES</a></li>
                </ul>
            </div>
        </div>
        </div>
        <div className="bottom-center">
            <div className="footer-image">
                <img src={assets.place} alt='Place'/>
            </div>
            <div className="footer-text">
                <h2>PROUDLY MADE IN MADURAI</h2>
                <p>@2024 Rights Reserved</p>
            </div>
        </div>
    </div>
   </section>
  )
}
