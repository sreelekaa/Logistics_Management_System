import React, { useState } from 'react';
import Navbar from '../../Components/navbar';
import '../../Assets/CSS/tracking.css';
import Footer from '../../Components/footer';

const trackingData = {
  '12345678': {
    vendorName: 'Vendor A',
    buyerName: 'Buyer A',
    currentState: 'In Transit',
    travels: [
      { date: '2024-07-25', location: 'City A' },
      { date: '2024-07-26', location: 'City B' },
      { date: '2024-07-27', location: 'City C' },
    ],
    amount: '$1000',
    content: '10kg wood',
  },
  '87654321': {
    vendorName: 'Vendor B',
    buyerName: 'Buyer B',
    currentState: 'Delivered',
    travels: [
      { date: '2024-07-20', location: 'City D' },
      { date: '2024-07-21', location: 'City E' },
      { date: '2024-07-22', location: 'City F' },
    ],
    amount: '$2000',
    content: '5kg potatoes',
  },
  // Add more mock data as needed
};

function Tracking() {
  const [trackingNumber, setTrackingNumber] = useState('');
  const [billDetails, setBillDetails] = useState(null);
  const [error, setError] = useState('');
  const [faqState, setFaqState] = useState([false, false, false]);

  const handleTrack = () => {
    if (trackingNumber.length === 8 && trackingData[trackingNumber]) {
      setBillDetails(trackingData[trackingNumber]);
      setError('');
    } else {
      setBillDetails(null);
      setError('Invalid tracking number. Please enter an 8-digit number.');
    }
  };

  const toggleFaq = (index) => {
    const newState = [...faqState];
    newState[index] = !newState[index];
    setFaqState(newState);
  };

  return (
    <div>
      <Navbar />
      <div className="tracking-container">
        <h1 className="tracking-title">Track Your Package</h1>
        <p className="tracking-description">
          Enter your tracking number below to get the latest update on your package. Our system provides real-time updates so you can stay informed every step of the way.
        </p>
        <div className="tracking-form">
          <input
            type="text"
            placeholder="Enter tracking number"
            value={trackingNumber}
            onChange={(e) => setTrackingNumber(e.target.value)}
            className="tracking-input"
          />
          <button onClick={handleTrack} className="tracking-button">Track</button>
        </div>
        {error && <p className="error-message">{error}</p>}
        {billDetails && (
          <div className="tracking-card">
            <h2>Bill Details</h2>
            <p><strong>Vendor Name:</strong> {billDetails.vendorName}</p>
            <p><strong>Buyer Name:</strong> {billDetails.buyerName}</p>
            <p><strong>Current State:</strong> {billDetails.currentState}</p>
            <p><strong>Amount:</strong> {billDetails.amount}</p>
            <p><strong>Content:</strong> {billDetails.content}</p>
            <h3>Travel History</h3>
            <ul>
              {billDetails.travels.map((travel, index) => (
                <li key={index}>{travel.date} - {travel.location}</li>
              ))}
            </ul>
          </div>
        )}
        <div className="tracking-card">
          <h2>How It Works</h2>
          <p>Our advanced logistics network allows you to track your package in real-time. From the moment your package is picked up to the final delivery, you will have full visibility.</p>
        </div>
        <div className="tracking-card">
          <h2>Frequently Asked Questions</h2>
          <ul className="faq-list">
            <li>
              <div className="faq-question" onClick={() => toggleFaq(0)}>
                <span className={`triangle ${faqState[0] ? 'down' : ''}`}></span>
                How do I track my package?
              </div>
              {faqState[0] && <p className="faq-answer">You can track your package by entering the tracking number provided to you at the time of purchase into the tracking form above.</p>}
            </li>
            <li>
              <div className="faq-question" onClick={() => toggleFaq(1)}>
                <span className={`triangle ${faqState[1] ? 'down' : ''}`}></span>
                What should I do if my package is delayed?
              </div>
              {faqState[1] && <p className="faq-answer">If your package is delayed, please contact our customer support team for assistance.</p>}
            </li>
            <li>
              <div className="faq-question" onClick={() => toggleFaq(2)}>
                <span className={`triangle ${faqState[2] ? 'down' : ''}`}></span>
                Can I change the delivery address?
              </div>
              {faqState[2] && <p className="faq-answer">To change the delivery address, please contact our customer support team as soon as possible.</p>}
            </li>
          </ul>
        </div>
        <div className="tracking-card">
          <h2>Customer Support</h2>
          <p>If you have any issues or inquiries, please contact our 24/7 support team at <a href="mailto:support@transpomaster.com">support@transpomaster.com</a> or call us at (123) 456-7890.</p>
        </div>
      </div>
      <Footer/>
    </div>
  );
}

export default Tracking;
