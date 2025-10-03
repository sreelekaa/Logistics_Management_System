import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTruck, faMapMarkerAlt, faCalendarAlt, faDollarSign } from '@fortawesome/free-solid-svg-icons';

const TripCard = ({ truck, origin, destination, startDate, endDate, earnings }) => {
  return (
    <div className="trip-card">
      <div className="trip-card-item">
        <FontAwesomeIcon icon={faTruck} />
        <span>{truck}</span>
      </div>
      <div className="trip-card-item">
        <FontAwesomeIcon icon={faMapMarkerAlt} />
        <span>{origin} to {destination}</span>
      </div>
      <div className="trip-card-item">
        <FontAwesomeIcon icon={faCalendarAlt} />
        <span>{startDate} - {endDate}</span>
      </div>
      <div className="trip-card-item">
        <FontAwesomeIcon icon={faDollarSign} />
        <span>${earnings}</span>
      </div>
    </div>
  );
};

export default TripCard;
