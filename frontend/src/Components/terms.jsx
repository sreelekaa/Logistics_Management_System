import React from 'react';
import Navbar from '../Components/navbar';
import '../Assets/CSS/terms.css'; // Create this CSS file for styling the Terms page

const Terms = () => {
  return (
    <div className="terms-page">
      <Navbar />
      <div className="terms-content">
        <h1>Terms and Conditions</h1>
        <p>
          Welcome to our logistics service platform. By accessing and using our services, you agree to comply with and be bound by the following terms and conditions. Please read them carefully before using our services.
        </p>
        <h2>1. Acceptance of Terms</h2>
        <p>
          By using our services, you agree to be bound by these terms and conditions, which may be updated by us from time to time without notice to you. It is your responsibility to review these terms periodically for any changes.
        </p>
        <h2>2. Use of Services</h2>
        <p>
          Our services are intended for the transportation and storage of goods. You agree to use our services only for lawful purposes and in accordance with all applicable laws and regulations.
        </p>
        <h2>3. User Responsibilities</h2>
        <p>
          You are responsible for providing accurate and complete information when booking our services. You must ensure that your goods are properly packaged and labeled. You agree not to ship any prohibited or hazardous materials.
        </p>
        <h2>4. Payment</h2>
        <p>
          Payment for services must be made in accordance with the pricing and payment terms specified at the time of booking. We reserve the right to change our pricing and payment terms at any time.
        </p>
        <h2>5. Limitation of Liability</h2>
        <p>
          Our liability for any loss or damage to goods is limited to the amount specified in our insurance policy. We are not liable for any indirect, incidental, or consequential damages arising out of or in connection with our services.
        </p>
        <h2>6. Termination</h2>
        <p>
          We reserve the right to terminate or suspend your access to our services at any time, without notice, for any reason, including but not limited to your breach of these terms and conditions.
        </p>
        <h2>7. Governing Law</h2>
        <p>
          These terms and conditions are governed by and construed in accordance with the laws of the jurisdiction in which our company is established. Any disputes arising out of or in connection with these terms shall be subject to the exclusive jurisdiction of the courts of that jurisdiction.
        </p>
        <h2>8. Contact Us</h2>
        <p>
          If you have any questions or concerns about these terms and conditions, please contact us at <a href="mailto:support@logisticsplatform.com">support@logisticsplatform.com</a>.
        </p>
      </div>
    </div>
  );
};

export default Terms;
