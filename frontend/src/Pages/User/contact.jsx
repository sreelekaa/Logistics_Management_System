import React, { useState } from 'react';
import Navbar from '../../Components/navbar';
import Footer from '../../Components/footer';
import '../../Assets/CSS/contact.css';
import axios from 'axios';

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    address: '',
    phone: '',
    message: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:8081/contact/add', formData);
      alert('Message sent successfully!');
      setFormData({
        name: '',
        email: '',
        address: '',
        phone: '',
        message: ''
      });
      window.location.reload();
    } catch (error) {
      console.error('There was an error sending the message!', error);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="contact-container">
        <h1 className="contact-title">Contact Us</h1>
        <p className="contact-description">
          We are here to assist you with any questions or concerns you may have. Reach out to us through any of the methods below.
        </p>
        <form className="contact-form" onSubmit={handleSubmit}>
          <h2>Send Us a Message</h2>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Your Name"
            className="contact-input"
          />
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Your Email"
            className="contact-input"
          />
          <textarea
            name="address"
            value={formData.address}
            onChange={handleChange}
            placeholder="Your Address"
            className="contact-textarea"
          />
          <input
            type="text"
            name="number"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Your Number"
            className="contact-input"
          />
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="Your Message"
            className="contact-textarea"
          />
          <button className="contact-button" type="submit">Submit</button>
        </form>
        <div className="contact-details">
          <h2>Our Contact Information</h2>
          <p>
            <strong>Email:</strong> <a href="mailto:support@transpomaster.com">support@transpomaster.com</a>
          </p>
          <p>
            <strong>Phone:</strong> (123) 456-7890
          </p>
          <p>
            <strong>Address:</strong> 123 Logistics Way, Transport City, TS 12345
          </p>
        </div>
        <div className="customer-support">
          <h2>Customer Support</h2>
          <p>If you have any issues or inquiries, please contact our 24/7 support team at <a href="mailto:support@transpomaster.com">support@transpomaster.com</a> or call us at (123) 456-7890.</p>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Contact;
