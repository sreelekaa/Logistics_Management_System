import React, { useState } from 'react';
import '../../Assets/CSS/supplier.css';
import { FaEdit, FaTrash } from 'react-icons/fa';

const SupplierManagement = () => {
  const [supplierData, setSupplierData] = useState([
    {
      supplier: 'John Doe',
      company: 'Teak Suppliers Inc.',
      itemSupplied: 'Teak',
      quantity: 100,
      date: '8/15/2022',
    },
    {
      supplier: 'Jane Smith',
      company: 'Bamboo Co.',
      itemSupplied: 'Bamboo',
      quantity: 200,
      date: '8/16/2022',
    },
    {
      supplier: 'Robert Brown',
      company: 'Maple Distributors',
      itemSupplied: 'Maple',
      quantity: 50,
      date: '8/17/2022',
    },
  ]);

  const [newSupplier, setNewSupplier] = useState({
    supplier: '',
    company: '',
    itemSupplied: '',
    quantity: '',
    date: '',
  });

  const [editingIndex, setEditingIndex] = useState(-1);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewSupplier((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddSupplier = () => {
    setSupplierData((prev) => [...prev, newSupplier]);
    setNewSupplier({
      supplier: '',
      company: '',
      itemSupplied: '',
      quantity: '',
      date: '',
    });
  };

  const handleEditSupplier = (index) => {
    setEditingIndex(index);
    setNewSupplier(supplierData[index]);
  };

  const handleUpdateSupplier = () => {
    const updatedData = supplierData.map((item, index) =>
      index === editingIndex ? newSupplier : item
    );
    setSupplierData(updatedData);
    setEditingIndex(-1);
    setNewSupplier({
      supplier: '',
      company: '',
      itemSupplied: '',
      quantity: '',
      date: '',
    });
  };

  const handleDeleteSupplier = (index) => {
    const updatedData = supplierData.filter((_, i) => i !== index);
    setSupplierData(updatedData);
  };

  return (
    <div className="supplier-management">
      <h3>Supplier Management</h3>
      <div className="supplier-card">
        <div className="supplier-form">
          <h4>{editingIndex >= 0 ? 'Edit Supplier' : 'Add New Supplier'}</h4>
          <div className="form-row">
            <input
              type="text"
              name="supplier"
              placeholder="Supplier Name"
              value={newSupplier.supplier}
              onChange={handleInputChange}
            />
            <input
              type="text"
              name="company"
              placeholder="Company"
              value={newSupplier.company}
              onChange={handleInputChange}
            />
            <input
              type="text"
              name="itemSupplied"
              placeholder="Item Supplied"
              value={newSupplier.itemSupplied}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-row">
            <input
              type="number"
              name="quantity"
              placeholder="Quantity"
              value={newSupplier.quantity}
              onChange={handleInputChange}
            />
            <input
              type="date"
              name="date"
              placeholder="Date"
              value={newSupplier.date}
              onChange={handleInputChange}
            />
          </div>
          <button
            className="btn add-update-btn"
            onClick={editingIndex >= 0 ? handleUpdateSupplier : handleAddSupplier}
          >
            {editingIndex >= 0 ? 'Update' : 'Add'}
          </button>
        </div>
      </div>

      <div className="supplier-card">
        <table>
          <thead>
            <tr>
              <th>Supplier</th>
              <th>Company</th>
              <th>Item Supplied</th>
              <th>Quantity</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {supplierData.map((supplier, index) => (
              <tr key={index}>
                <td>{supplier.supplier}</td>
                <td>{supplier.company}</td>
                <td>{supplier.itemSupplied}</td>
                <td>{supplier.quantity}</td>
                <td>{supplier.date}</td>
                <td>
                  <div className="action-buttons">
                    <button className="btn edit-btn" onClick={() => handleEditSupplier(index)}>
                      <FaEdit />
                    </button>
                    <button className="btn delete-btn" onClick={() => handleDeleteSupplier(index)}>
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

export default SupplierManagement;
