import React from 'react';
import { assets } from '../../assets/assets';
import './ContactForm.css';

export default function ContactForm() {
  return (
    <section className='contact-form-section'>
      <div className="contact-form-container">
        <div className="contact-form-left">
          {/* <div className="contact-form-up">
            <h2>Get in Touch with Starbelly</h2>
          </div> */}
          <div className="contact-form-down">
            {/* <div className="contact-form-info-left"> */}
            {/* <button><span>Home</span> / Contact</button> */}
            {/* <div className="contactForm-img">
                <img src={assets.communication} alt=''/>
              </div>
            </div> */}
            <div className="contact-form-right">
              <h1>Got a Question? Let's Chat!
              </h1>
              <p>
                If you have any questions about our products or need further information, please feel free to reach out to us. We are here to assist you and would be happy to help.
              </p>
              <p>
                <strong>Email us:</strong>
                <a href="mailto:Kindrice@gmail.com" className="mail">Kindrice@gmail.com</a>
              </p>
              <p>
                <strong>Phone us:</strong>
                <a href="tel:+919843297474" className="phone">+91-98432-97474</a>
              </p>
              <div className='mt-2'>
                <strong>Address:</strong>
                <span className='text-black'>
                  R.K. Brothers Agro Foods Private Limited
                  66/2, New Ramnad Rd,
                  Madurai, Meenakshi Nagar,
                  Tamil Nadu - 625001
                </span>
              </div>
              <p>
                We look forward to hearing from you!
              </p>


              <form>
                <label htmlFor="Name">Name</label>
                <input type="text" id="Name" name="Name" placeholder='Enter Your Name' />
                <label htmlFor="Email">Email</label>
                <input type="email" id="Email" name="Email" placeholder='Enter Your Email' />
                <label htmlFor='help'>How can we help?</label>
                <textarea placeholder=""></textarea>
                <h2>*All personal information will be kept confidential.</h2>
                <button type="submit">Get Started</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
