import React from 'react';
import { useForm } from 'react-hook-form';
import './ContactForm.css';
import { submitContactForm } from '../../api/userapi';
import { toast } from 'react-toastify';

export default function ContactForm() {
  const { register, handleSubmit, formState: { errors }, reset } = useForm();


  const onSubmit = async (data) => {
    try {
      await submitContactForm(data.Name, data.Email, data.help);
      toast.success('Form submitted successfully');
      reset(); // Reset the form after successful submission
    } catch (error) {
      toast.error('There was an error submitting the form. Please try again.');
    }
  };

  return (
    <section className='contact-form-section'>
      <div className="contact-form-container">
        <div className="contact-form-left">
          <div className="contact-form-down">
            <div className="contact-form-right">
              <h1>Got a Question? Let's Chat!</h1>
              <p>If you have any questions about our products or need further information, please feel free to reach out to us. We are here to assist you and would be happy to help.</p>

              <p className='mt-2'>
                You can reach us via email at <a className="text-green-600" href='mailto:hello@kindrice.co '>hello@kindrice.co</a> or call us at <a className="text-green-600" href="tel:+919940178297">91-99401-78297</a>
              </p>

              <div className='mt-2'>
                <strong>Address : </strong>
                <span className='text-black'>
                  R.K. Brothers Agro Foods Private Limited
                  66/2, New Ramnad Rd,
                  Madurai, Meenakshi Nagar,
                  Tamil Nadu - 625001
                </span>
              </div>
              <p className='mt-7'>
                We look forward to hearing from you!
              </p>

              {/* Form starts here */}
              <form onSubmit={handleSubmit(onSubmit)}>
                <label htmlFor="Name">Name</label>
                <input
                  type="text"
                  id="Name"
                  placeholder='Enter Your Name'
                  {...register("Name", { required: "Name is required" })}
                />
                {errors.Name && <p className="error">{errors.Name.message}</p>}

                <label htmlFor="Email">Email</label>
                <input
                  type="email"
                  id="Email"
                  placeholder='Enter Your Email'
                  {...register("Email", {
                    required: "Email is required",
                    pattern: {
                      value: /^\S+@\S+$/i,
                      message: "Invalid email format"
                    }
                  })}
                />
                {errors.Email && <p className="error">{errors.Email.message}</p>}

                <label htmlFor="help">How can we help?</label>
                <textarea
                  id="help"
                  placeholder="Enter your message"
                  {...register("help", { required: "Message is required" })}
                />
                {errors.help && <p className="error">{errors.help.message}</p>}

                <h2>*All personal information will be kept confidential.</h2>
                <button type="submit">Get Started</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
