import React, { useState } from 'react';
import '../../Assets/CSS/vendor.css';
import { FaEdit, FaTrash } from 'react-icons/fa';

const VendorManagement = () => {
  const [vendorData, setVendorData] = useState([
    {
      vendor: 'Alice Johnson',
      company: 'Acme Supplies',
      itemProvided: 'Office Supplies',
      quantity: 300,
      date: '9/12/2022',
    },
    {
      vendor: 'Bob Davis',
      company: 'TechGear Inc.',
      itemProvided: 'Electronics',
      quantity: 150,
      date: '9/13/2022',
    },
    {
      vendor: 'Carol White',
      company: 'Furniture Co.',
      itemProvided: 'Office Furniture',
      quantity: 75,
      date: '9/14/2022',
    },
  ]);

  const [newVendor, setNewVendor] = useState({
    vendor: '',
    company: '',
    itemProvided: '',
    quantity: '',
    date: '',
  });

  const [editingIndex, setEditingIndex] = useState(-1);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewVendor((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddVendor = () => {
    setVendorData((prev) => [...prev, newVendor]);
    setNewVendor({
      vendor: '',
      company: '',
      itemProvided: '',
      quantity: '',
      date: '',
    });
  };

  const handleEditVendor = (index) => {
    setEditingIndex(index);
    setNewVendor(vendorData[index]);
  };

  const handleUpdateVendor = () => {
    const updatedData = vendorData.map((item, index) =>
      index === editingIndex ? newVendor : item
    );
    setVendorData(updatedData);
    setEditingIndex(-1);
    setNewVendor({
      vendor: '',
      company: '',
      itemProvided: '',
      quantity: '',
      date: '',
    });
  };

  const handleDeleteVendor = (index) => {
    const updatedData = vendorData.filter((_, i) => i !== index);
    setVendorData(updatedData);
  };

  return (
    <div className="vendor-management">
      <h3>Vendor Management</h3>
      <div className="vendor-card">
        <div className="vendor-form">
          <h4>{editingIndex >= 0 ? 'Edit Vendor' : 'Add New Vendor'}</h4>
          <div className="form-row">
            <input
              type="text"
              name="vendor"
              placeholder="Vendor Name"
              value={newVendor.vendor}
              onChange={handleInputChange}
            />
            <input
              type="text"
              name="company"
              placeholder="Company"
              value={newVendor.company}
              onChange={handleInputChange}
            />
            <input
              type="text"
              name="itemSold"
              placeholder="Item Sold"
              value={newVendor.itemProvided}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-row">
            <input
              type="number"
              name="quantity"
              placeholder="Quantity"
              value={newVendor.quantity}
              onChange={handleInputChange}
            />
            <input
              type="date"
              name="date"
              placeholder="Date"
              value={newVendor.date}
              onChange={handleInputChange}
            />
          </div>
          <button
            className="btn add-update-btn"
            onClick={editingIndex >= 0 ? handleUpdateVendor : handleAddVendor}
          >
            {editingIndex >= 0 ? 'Update' : 'Add'}
          </button>
        </div>
      </div>

      <div className="vendor-card">
        <table>
          <thead>
            <tr>
              <th>Vendor</th>
              <th>Company</th>
              <th>Item Sold</th>
              <th>Quantity</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {vendorData.map((vendor, index) => (
              <tr key={index}>
                <td>{vendor.vendor}</td>
                <td>{vendor.company}</td>
                <td>{vendor.itemProvided}</td>
                <td>{vendor.quantity}</td>
                <td>{vendor.date}</td>
                <td>
                  <div className="action-buttons">
                    <button className="btn edit-btn" onClick={() => handleEditVendor(index)}>
                      <FaEdit />
                    </button>
                    <button className="btn delete-btn" onClick={() => handleDeleteVendor(index)}>
                      <FaTrash />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default VendorManagement;
