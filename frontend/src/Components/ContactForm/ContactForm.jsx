import React from 'react';
import { useForm } from 'react-hook-form';
import './ContactForm.css';
import { submitContactForm } from '../../api/userapi';

export default function ContactForm() {
  const { register, handleSubmit, formState: { errors }, reset } = useForm();


  const onSubmit = async (data) => {
    try {
      await submitContactForm(data.Name, data.Email, data.help);
      alert('Form submitted successfully');
      reset(); // Reset the form after successful submission
    } catch (error) {
      alert('There was an error submitting the form. Please try again.');
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
                You can reach us via email at <a className="text-green-600" href='mailto:hellokindrice@gmail.com '>hellokindrice@gmail.com</a> or call us at <a className="text-green-600" href="tel:+919843297474">+91-98432-97474</a>
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
