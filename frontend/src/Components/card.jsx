import React from 'react';
import '../Assets/CSS/card.css';

function Card({ title, description, image }) {
  return (
    <div className="card">
      {image && <img src={image} alt={title} className="card-image" />}
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  );
}

export default Card;
