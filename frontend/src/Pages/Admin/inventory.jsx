import React, { useState } from 'react';
import '../../Assets/CSS/inventoryManagement.css';
import { FaEdit, FaTrash } from 'react-icons/fa';

const InventoryManagement = () => {
  const [inventoryData, setInventoryData] = useState([
    {
      item: 'Teak',
      quantity: 100,
      location: 'Warehouse A',
      status: 'In Stock',
    },
    {
      item: 'Bamboo',
      quantity: 200,
      location: 'Warehouse B',
      status: 'In Stock',
    },
    {
      item: 'Maple',
      quantity: 50,
      location: 'Warehouse C',
      status: 'Low Stock',
    },
  ]);

  const [newInventory, setNewInventory] = useState({
    item: '',
    quantity: '',
    location: '',
    status: '',
  });

  const [editingIndex, setEditingIndex] = useState(-1);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewInventory((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddInventory = () => {
    setInventoryData((prev) => [...prev, newInventory]);
    setNewInventory({
      item: '',
      quantity: '',
      location: '',
      status: '',
    });
  };

  const handleEditInventory = (index) => {
    setEditingIndex(index);
    setNewInventory(inventoryData[index]);
  };

  const handleUpdateInventory = () => {
    const updatedData = inventoryData.map((item, index) =>
      index === editingIndex ? newInventory : item
    );
    setInventoryData(updatedData);
    setEditingIndex(-1);
    setNewInventory({
      item: '',
      quantity: '',
      location: '',
      status: '',
    });
  };

  const handleDeleteInventory = (index) => {
    const updatedData = inventoryData.filter((_, i) => i !== index);
    setInventoryData(updatedData);
  };

  return (
    <div className="inventory-management">
      <h3>Inventory Management</h3>
      <div className="inventory-card">
        <div className="inventory-form">
          <h4>{editingIndex >= 0 ? 'Edit Inventory Item' : 'Add New Inventory Item'}</h4>
          <div className="form-row">
            <input
              type="text"
              name="item"
              placeholder="Item"
              value={newInventory.item}
              onChange={handleInputChange}
            />
            <input
              type="number"
              name="quantity"
              placeholder="Quantity"
              value={newInventory.quantity}
              onChange={handleInputChange}
            />
            <input
              type="text"
              name="location"
              placeholder="Location"
              value={newInventory.location}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-row">
            <input
              type="text"
              name="status"
              placeholder="Status"
              value={newInventory.status}
              onChange={handleInputChange}
            />
          </div>
          <button
            className="btn add-update-btn"
            onClick={editingIndex >= 0 ? handleUpdateInventory : handleAddInventory}
          >
            {editingIndex >= 0 ? 'Update' : 'Add'}
          </button>
        </div>
      </div>

      <div className="inventory-card">
        <table>
          <thead>
            <tr>
              <th>Item</th>
              <th>Quantity</th>
              <th>Location</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {inventoryData.map((inventory, index) => (
              <tr key={index}>
                <td>{inventory.item}</td>
                <td>{inventory.quantity}</td>
                <td>{inventory.location}</td>
                <td>{inventory.status}</td>
                <td>
                  <div className="action-buttons">
                    <button className="btn edit-btn" onClick={() => handleEditInventory(index)}>
                      <FaEdit />
                    </button>
                    <button className="btn delete-btn" onClick={() => handleDeleteInventory(index)}>
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

export default InventoryManagement;
