import React, { useState, useEffect } from 'react';
import '../../Assets/CSS/home.css'; 
import Navbar from '../../Components/navbar';
import Footer from '../../Components/footer';
import Card from '../../Components/card';
import johndoe from '../../Assets/Images/johndoe.jpg';
import janesmith from '../../Assets/Images/janesmith.jpg';
import bobjohnson from '../../Assets/Images/bobjohnson.jpg';
import image1 from '../../Assets/Images/4.png';
import image2 from '../../Assets/Images/5.jpg';
import image3 from '../../Assets/Images/6.webp';

const images = [image1, image2, image3];

function Home() {
  const features = [
    { title: "Fast Delivery", description: "Get your items delivered within 24 hours." },
    { title: "24/7 Support", description: "Our support team is available around the clock." },
    { title: "Affordable Prices", description: "We offer the best prices in the market." },
  ];

  const storeInfo = [
    { title: "Our Story", description: "We started our journey in 2010, aiming to revolutionize logistics." },
    { title: "Our Mission", description: "To provide the fastest and most reliable delivery services." },
    { title: "Our Vision", description: "To be the global leader in logistics and supply chain solutions." },
  ];

  const feedbacks = [
    { name: "John Doe", feedback: "Excellent service, very satisfied with the delivery time!", image: johndoe },
    { name: "Jane Smith", feedback: "Affordable prices and great customer support.", image: janesmith },
    { name: "Bob Johnson", feedback: "Quick and reliable, will definitely use again.", image: bobjohnson },
  ];

  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prevImage) => (prevImage + 1) % images.length);
    }, 4000); // Change image every 4 seconds

    return () => clearInterval(interval);
  },[]);

  return (
    <div>
      <Navbar />
      <div className="home-container">
        <div className="home-header">
          <h1>Welcome to TranspoMaster!</h1>
          <p>Streamlining your logistics with smart, efficient management solutions.</p>
        </div>
        <div className="background" style={{ backgroundImage: `url(${images[currentImage]})` }}>
          {/* You can add some debugging here */}
          <div style={{ color: 'white', padding: '10px' }}>
          </div>
        </div>
        <h2>Features</h2>
        <div className="card-container">
          {features.map((feature, index) => (
            <Card key={index} title={feature.title} description={feature.description} />
          ))}
        </div>
        
        <h2>Store Information</h2>
        <div className="card-container">
          {storeInfo.map((info, index) => (
            <Card key={index} title={info.title} description={info.description} />
          ))}
        </div>
        
        <h2>Customer Feedback</h2>
        <div className="card-container">
          {feedbacks.map((feedback, index) => (
            <Card key={index} title={feedback.name} description={feedback.feedback} image={feedback.image} />
          ))}
        </div>
        <Footer />
      </div>
    </div>
  );
}

export default Home;
