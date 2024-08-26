import React from 'react'
import { assets } from '../../assets/assets'
import './ContactForm.css'

export default function ContactForm() {
  return (
    <section className='contact-form-section'>
        <div className="contact-form-conatiner">
            <div className="contact-form-left">
            <div className="contact-form-up">
                <h2>Get in Touch with Starbelly</h2>
                </div>
                <div className="contact-form-down">
               
                    <div className="contact-form-info-left">
                    <button><span>Home</span> / Contact</button>
                    <div className="contactForm-img">
                        <img src={assets.communication} alt=''/>
                    </div>
                    </div>
                    <div className="contact-form-right">
                        <h1>Let’s level up your<br/> brand, together</h1>
                        <p>You can reach us anytime via <a href="mailto:Kindrice@gmail.com" className='mail'>Kindrice@gmail.com</a></p>
                        <form>
                            <label for="Name">Name</label>
                            <input type="text" id="Name" name="Name" placeholder='Enter Your Name'/>
                            <label for="Email">Email</label>
                            <input type="email" id="Email" name="Email" placeholder='Enter Your Email'/>
                            <label for='help'>How can we help?</label>
                            <textarea placeholder="Tell us a little about the project..."></textarea>
                            <h2>*We promise not to disclose your personal information to third parties.</h2>
                            <button type="submit">Get Started</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </section>
  )
}
