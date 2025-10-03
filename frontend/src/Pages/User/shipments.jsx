import React, { useState, useEffect } from 'react';
import axios from 'axios';
import jsPDF from 'jspdf';
import oceanTransportImg from '../../Assets/Images/ship.jpg';
import airlineWayImg from '../../Assets/Images/air.jpg';
import roadwayImg from '../../Assets/Images/landdo.jpg';
import roadwayinImg from '../../Assets/Images/railway.jpg';
import warehouseImg from '../../Assets/Images/warehouse.jpg';
import specialcargo from '../../Assets/Images/pipe.jpg';
import Navbar from '../../Components/navbar';
import Footer from '../../Components/footer';
import '../../Assets/CSS/shipments.css';

const servicesData = [
  {
    title: 'Land Transport (Roadways)',
    image: roadwayImg,
    description: 'Reliable and swift road transportation services for domestic deliveries.',
    cost: '$150',
    paymentOptions: ['Credit Card', 'Net Banking']
  },
  {
    title: 'Land Transport (Railways)',
    image: roadwayinImg,
    description: 'Efficient rail transportation services for long-distance and bulk deliveries.',
    cost: '$250',
    paymentOptions: ['Credit Card', 'Net Banking']
  },
  {
    title: 'Pipeline Transport',
    image: specialcargo,
    description: 'Specialized transportation of liquids and gases through pipelines.',
    cost: '$300',
    paymentOptions: ['Credit Card', 'UPI', 'Net Banking']
  },
  {
    title: 'Ocean Transport',
    image: oceanTransportImg,
    description: 'Reliable and cost-effective solution for shipping goods across seas and oceans.',
    cost: '$200',
    paymentOptions: ['Credit Card', 'UPI', 'Net Banking']
  },
  {
    title: 'Airline Way',
    image: airlineWayImg,
    description: 'Fast and efficient air cargo services for urgent and time-sensitive shipments.',
    cost: '$500',
    paymentOptions: ['Credit Card', 'UPI']
  },
  {
    title: 'Warehouse Distribution',
    image: warehouseImg,
    description: 'Secure and organized storage solutions with effective distribution channels.',
    cost: '$100',
    paymentOptions: ['Credit Card', 'Net Banking']
  }
];

const Shipments = () => {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    selectedService: '',
    customerName: '',
    email: '',
    phoneNumber: '',
    address: '',
    deliveryDate: '',
    shipmentWeight: '',
    packageDimensions: '',
    goodsType: '',
    warehouseDetails: '', // 'None', 'Needed', 'Goods Needed'
    warehouseLocation: '',
    warehouseSpace: '',
    warehouseGoods: '',
    warehouseGoodsQuantity: '',
  });

  const handleChange = (field, value) => {
    setFormData({
      ...formData,
      [field]: value,
    });
  };

  const nextStep = () => setCurrentStep(currentStep + 1);
  const prevStep = () => setCurrentStep(currentStep - 1);

  const generatePDF = () => {
    const doc = new jsPDF();
    const serviceDetails = servicesData.find(service => service.title === formData.selectedService);

    doc.text('Shipment Bill', 10, 10);
    doc.text(`Service: ${formData.selectedService}`, 10, 20);
    doc.text(`Name: ${formData.customerName}`, 10, 30);
    doc.text(`Email: ${formData.email}`, 10, 40);
    doc.text(`Phone Number: ${formData.phoneNumber}`, 10, 50);
    doc.text(`Address: ${formData.address}`, 10, 60);
    doc.text(`Cost: ${serviceDetails ? serviceDetails.cost : ''}`, 10, 70);

    if (formData.selectedService === 'Warehouse Distribution') {
      doc.text(`Warehouse Details: ${formData.warehouseDetails}`, 10, 80);
      if (formData.warehouseDetails === 'Needed') {
        doc.text(`Warehouse Location: ${formData.warehouseLocation}`, 10, 90);
        doc.text(`Space Needed: ${formData.warehouseSpace}`, 10, 100);
      }
      if (formData.warehouseDetails === 'Goods Needed') {
        doc.text(`Goods Needed: ${formData.warehouseGoods}`, 10, 110);
        doc.text(`Quantity of Goods: ${formData.warehouseGoodsQuantity}`, 10, 120);
      }
    } else {
      doc.text(`Shipment Weight: ${formData.shipmentWeight}`, 10, 80);
      doc.text(`Package Dimensions: ${formData.packageDimensions}`, 10, 90);
      doc.text(`Goods Type: ${formData.goodsType}`, 10, 100);
    }

    doc.save('shipment-bill.pdf');
  };

  const handlePaymentSuccess = async (response) => {
    alert('Payment successful!');
    generatePDF();
    window.location.reload();
  
    try {
      // Update the payment status
      const shipmentResponse = await axios.put(`http://localhost:8081/shipments/update/${response.razorpay_order_id}`, {
        status: 'Paid'
      });
      console.log('Payment status updated:', shipmentResponse.data);
  
    } catch (error) {
      console.error('Error updating payment status:', error);
    }
  };
  

  const handlePayment = () => {
    if (window.Razorpay) {
      const selectedService = servicesData.find(service => service.title === formData.selectedService);
      const amount = parseFloat(selectedService.cost.replace('$', '').replace(',', ''));

      const options = {
        key: 'rzp_test_t0DKFhP0fFX10m', // Replace with your Razorpay API key
        amount: amount * 100, // Amount in paise (1 INR = 100 paise)
        currency: 'INR',
        name: 'TranspoMaster',
        description: 'Test Transaction',
        handler: function (response) {
          handlePaymentSuccess(response);
        },
        prefill: {
          name: formData.customerName,
          email: formData.email,
          contact: formData.phoneNumber,
        },
        notes: {
          address: formData.address,
        },
        theme: {
          color: '#3399cc',
        },
      };

      const paymentObject = new window.Razorpay(options);
      paymentObject.open();
    } else {
      console.error('Razorpay library is not loaded');
    }
  };

  const handleSubmit = async () => {
    if (!formData.selectedService || !formData.customerName || !formData.email || !formData.phoneNumber || !formData.address) {
      alert('Please fill out all required fields correctly.');
      return;
    }

    // Include warehouse-specific validation
    if (formData.selectedService === 'Warehouse Distribution') {
      if (formData.warehouseDetails === 'Needed' && (!formData.warehouseLocation || !formData.warehouseSpace)) {
        alert('Please fill out all required warehouse fields correctly.');
        return;
      }
      if (formData.warehouseDetails === 'Goods Needed' && (!formData.warehouseGoods || !formData.warehouseGoodsQuantity)) {
        alert('Please fill out all required warehouse goods fields correctly.');
        return;
      }
    } else {
      if (!formData.shipmentWeight || !formData.packageDimensions || !formData.goodsType) {
        alert('Please fill out all required shipment fields correctly.');
        return;
      }
    }

    try {
      const response = await axios.post('http://localhost:8081/shipments/add', formData);
      console.log('Shipment created:', response.data);

      handlePayment();

    } catch (error) {
      console.error('Error creating shipment:', error);
    }
  };

  const serviceDetails = servicesData.find(service => service.title === formData.selectedService);

  return (
    <div>
      <Navbar />
      <div className="shipments-page">
        <h1>Book Your Shipment</h1>
        <div className="form-container">
          {currentStep === 1 && (
            <div className="step">
              <h2>Select Service</h2>
              <label>
                Select Service:
                <select value={formData.selectedService} onChange={e => handleChange('selectedService', e.target.value)} required className="select">
                  <option value="" disabled>Select a service</option>
                  {servicesData.map((service, index) => (
                    <option key={index} value={service.title}>{service.title}</option>
                  ))}
                </select>
              </label>
              {serviceDetails && (
                <div className="service-details">
                  <h2>Service Details</h2>
                  <img src={serviceDetails.image} alt={serviceDetails.title} className="service-image" />
                  <p>{serviceDetails.description}</p>
                  <p>Cost: {serviceDetails.cost}</p>
                  <h3>Payment Options:</h3>
                  <ul>
                    {serviceDetails.paymentOptions.map((option, idx) => (
                      <li key={idx}>{option}</li>
                    ))}
                  </ul>
                  <button onClick={nextStep} className="button">Next</button>
                </div>
              )}
            </div>
          )}
          {currentStep === 2 && (
            <div className="step">
              <h2>Fill Shipment Details</h2>
              <label>
                Name:
                <input
                  type="text"
                  value={formData.customerName}
                  onChange={e => handleChange('customerName', e.target.value)}
                  required
                  className="input"
                />
              </label>
              <label>
                Email:
                <input
                  type="email"
                  value={formData.email}
                  onChange={e => handleChange('email', e.target.value)}
                  required
                  className="input"
                />
              </label>
              <label>
                Phone Number:
                <input
                  type="text"
                  value={formData.phoneNumber}
                  onChange={e => handleChange('phoneNumber', e.target.value)}
                  required
                  className="input"
                />
              </label>
              <label>
                Address:
                <input
                  type="text"
                  value={formData.address}
                  onChange={e => handleChange('address', e.target.value)}
                  required
                  className="input"
                />
              </label>
              <label>
                Delivery Date:
                <input
                  type="date"
                  value={formData.deliveryDate}
                  onChange={e => handleChange('deliveryDate', e.target.value)}
                  className="input"
                />
              </label>
              {formData.selectedService === 'Warehouse Distribution' ? (
                <>
                  <label>
                    Warehouse Details:
                    <select
                      value={formData.warehouseDetails}
                      onChange={e => handleChange('warehouseDetails', e.target.value)}
                      className="select"
                      required
                    >
                      <option value="" disabled>Select Details</option>
                      <option value="Needed">Warehouse Needed</option>
                      <option value="Goods Needed">Goods Needed</option>
                      <option value="None">None</option>
                    </select>
                  </label>
                  {formData.warehouseDetails === 'Needed' && (
                    <>
                      <label>
                        Warehouse Location:
                        <input
                          type="text"
                          value={formData.warehouseLocation}
                          onChange={e => handleChange('warehouseLocation', e.target.value)}
                          required
                          className="input"
                        />
                      </label>
                      <label>
                        Space Needed (in sq. meters):
                        <input
                          type="number"
                          value={formData.warehouseSpace}
                          onChange={e => handleChange('warehouseSpace', e.target.value)}
                          required
                          className="input"
                        />
                      </label>
                    </>
                  )}
                  {formData.warehouseDetails === 'Goods Needed' && (
                    <>
                      <label>
                        Goods Needed:
                        <input
                          type="text"
                          value={formData.warehouseGoods}
                          onChange={e => handleChange('warehouseGoods', e.target.value)}
                          required
                          className="input"
                        />
                      </label>
                      <label>
                        Quantity of Goods:
                        <input
                          type="number"
                          value={formData.warehouseGoodsQuantity}
                          onChange={e => handleChange('warehouseGoodsQuantity', e.target.value)}
                          required
                          className="input"
                        />
                      </label>
                    </>
                  )}
                </>
              ) : (
                <>
                  <label>
                    Shipment Weight (kg):
                    <input
                      type="number"
                      value={formData.shipmentWeight}
                      onChange={e => handleChange('shipmentWeight', e.target.value)}
                      required
                      className="input"
                    />
                  </label>
                  <label>
                    Package Dimensions (LxWxH in cm):
                    <input
                      type="text"
                      value={formData.packageDimensions}
                      onChange={e => handleChange('packageDimensions', e.target.value)}
                      required
                      className="input"
                    />
                  </label>
                  <label>
                    Goods Type:
                    <input
                      type="text"
                      value={formData.goodsType}
                      onChange={e => handleChange('goodsType', e.target.value)}
                      required
                      className="input"
                    />
                  </label>
                </>
              )}
              <label>
              <input type="checkbox" required />
              I agree to the <a href="/terms" target="_blank" className="link">terms and conditions</a>.
            </label>
              <div className="navigation-buttons">
                <button type="button" onClick={prevStep} className="button">Back</button>
                <button type="button" onClick={handleSubmit} className="button">Submit</button>
              </div>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Shipments;
