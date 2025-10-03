import React from 'react';
// import '../Assets/CSS/servicecard.css';

const ServiceCard = ({ title, description, image, onBookNow, onInfoClick }) => {
  return (
    <div className="service-card">
      <img src={image} alt={title} className="service-card-img" />
      <h3>{title}</h3>
      <p>{description}</p>
      <div className='button-group'>
        <button onClick={onBookNow} className="primary-button">Book Now</button>
        <button onClick={onInfoClick} className="primary-button">View Details</button>
      </div>
    </div>
  );
};

export default ServiceCard;
