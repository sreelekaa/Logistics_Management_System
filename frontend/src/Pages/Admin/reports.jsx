import React, { useState } from 'react';
import '../../Assets/CSS/reports.css';

const Reports = () => {
  const [reportData, setReportData] = useState([
    {
      billNo: '001',
      serviceUsed: 'Warehouse',
      warehouseDetails: {
        location: 'Main Warehouse',
        name: 'John Doe',
        contact: '123-456-7890',
        itemBrought: 'Teak',
        quantity: 100,
        supplier: 'Teak Suppliers Inc., Jane Doe, 987-654-3210',
      },
      billPaid: true,
    },
    {
      billNo: '002',
      serviceUsed: 'Transport',
      transportDetails: {
        transportMode: 'Truck',
        vehicleLicense: 'ABC-1234',
        quantity: 200,
        driverName: 'James Smith',
      },
      billPaid: false,
    },
    {
      billNo: '003',
      serviceUsed: 'Warehouse',
      warehouseDetails: {
        location: 'Central Storage',
        name: 'Alice Johnson',
        contact: '234-567-8901',
        itemBrought: 'Bamboo',
        quantity: 150,
        supplier: 'Bamboo Co., Robert Brown, 876-543-2109',
      },
      billPaid: true,
    },
    {
      billNo: '004',
      serviceUsed: 'Transport',
      transportDetails: {
        transportMode: 'Van',
        vehicleLicense: 'XYZ-7890',
        quantity: 300,
        driverName: 'Mary Lee',
      },
      billPaid: false,
    },
    {
      billNo: '005',
      serviceUsed: 'Warehouse',
      warehouseDetails: {
        location: 'South Warehouse',
        name: 'Michael Scott',
        contact: '345-678-9012',
        itemBrought: 'Oak',
        quantity: 80,
        supplier: 'Oak Supplies Ltd., Jim Halpert, 765-432-1098',
      },
      billPaid: true,
    },
    {
      billNo: '006',
      serviceUsed: 'Transport',
      transportDetails: {
        transportMode: 'Cargo Ship',
        vehicleLicense: 'CARGO-5678',
        quantity: 500,
        driverName: 'Sarah Connor',
      },
      billPaid: false,
    },
  ]);

  return (
    <div className="reports">
      <h3>Reports</h3>
      <div className="reports-container">
        {reportData.map((report, index) => (
          <div key={index} className="report-card">
            <h4>Bill No: {report.billNo}</h4>
            <h4>Service Used: {report.serviceUsed}</h4>
            {report.serviceUsed === 'Warehouse' && (
              <div className="warehouse-details">
                <p><strong>Location:</strong> {report.warehouseDetails.location}</p>
                <p><strong>Name:</strong> {report.warehouseDetails.name}</p>
                <p><strong>Contact:</strong> {report.warehouseDetails.contact}</p>
                <p><strong>Item Brought:</strong> {report.warehouseDetails.itemBrought}</p>
                <p><strong>Quantity:</strong> {report.warehouseDetails.quantity}</p>
                <p><strong>Supplier Name and Info:</strong> {report.warehouseDetails.supplier}</p>
              </div>
            )}
            {report.serviceUsed === 'Transport' && (
              <div className="transport-details">
                <p><strong>Transport Mode:</strong> {report.transportDetails.transportMode}</p>
                <p><strong>Vehicle License:</strong> {report.transportDetails.vehicleLicense}</p>
                <p><strong>Quantity:</strong> {report.transportDetails.quantity}</p>
                <p><strong>Driver Name:</strong> {report.transportDetails.driverName}</p>
              </div>
            )}
            <p><strong>Bill Paid:</strong> {report.billPaid ? 'Yes' : 'No'}</p>
            {/* Barcode can be added here */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Reports;
