import React from 'react';
import { useLocation } from 'react-router-dom';
import '../../Assets/CSS/confirmation.css';

const ConfirmationPage = () => {
  const location = useLocation();
  const { paymentDetails, selectedService, customerName, contactInfo, details, warehouseItems, containers } = location.state || {};

  return (
    <div className="confirmation-page">
      <h1>Order Confirmed!</h1>
      <p>Thank you for your order. Your order has been successfully placed.</p>
      <h2>Bill Details:</h2>
      <div className="bill-details">
        <p><strong>Order Number:</strong> {paymentDetails?.order_id || 'N/A'}</p>
        <p><strong>Order Date:</strong> {new Date().toLocaleDateString()}</p>
        <p><strong>Total Amount:</strong> {paymentDetails?.amount || 'N/A'}</p>
      </div>
      <h2>Booking Details:</h2>
      <p><strong>Service:</strong> {selectedService}</p>
      <p><strong>Name:</strong> {customerName}</p>
      <p><strong>Contact:</strong> {contactInfo}</p>
      <p><strong>Additional Details:</strong> {details}</p>
      {selectedService === 'Warehouse Distribution' && (
        <div>
          <h3>Warehouse Items:</h3>
          <ul>
            {warehouseItems.map((item, index) => (
              <li key={index}>{item.item} (Quantity: {item.quantity})</li>
            ))}
          </ul>
          <p><strong>Number of Containers:</strong> {containers}</p>
        </div>
      )}
      <p>You will be redirected to the home page in 15 seconds.</p>
    </div>
  );
};

export default ConfirmationPage;
