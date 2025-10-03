import React, { useState } from 'react';
import '../../Assets/CSS/transportServices.css';
import { FaEdit, FaTrash } from 'react-icons/fa';

const TransportServices = () => {
  const [transportData, setTransportData] = useState([
    {
      licence: 'HDWHW3G',
      driverName: 'John Doe',
      capacity: '15 tons',
      registration: 'Valid',
    },
    {
      licence: 'MXXKF31',
      driverName: 'Jane Smith',
      capacity: '20 tons',
      registration: 'Valid',
    },
    {
      licence: 'PL9ZKP1',
      driverName: 'Chris Johnson',
      capacity: '10 tons',
      registration: 'Expired',
    },
    {
      licence: 'XZ0JKD3',
      driverName: 'Anna Brown',
      capacity: '25 tons',
      registration: 'Valid',
    },
    {
      licence: 'HRT8WY9',
      driverName: 'Mike Davis',
      capacity: '18 tons',
      registration: 'Expired',
    },
    {
      licence: 'LQW7MD2',
      driverName: 'Sarah Wilson',
      capacity: '22 tons',
      registration: 'Valid',
    },
  ]);

  const [newTransport, setNewTransport] = useState({
    licence: '',
    driverName: '',
    capacity: '',
    registration: '',
  });

  const [editingIndex, setEditingIndex] = useState(-1);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewTransport((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddTransport = () => {
    setTransportData((prev) => [...prev, newTransport]);
    setNewTransport({
      licence: '',
      driverName: '',
      capacity: '',
      registration: '',
    });
  };

  const handleEditTransport = (index) => {
    setEditingIndex(index);
    setNewTransport(transportData[index]);
  };

  const handleUpdateTransport = () => {
    const updatedData = transportData.map((item, index) =>
      index === editingIndex ? newTransport : item
    );
    setTransportData(updatedData);
    setEditingIndex(-1);
    setNewTransport({
      licence: '',
      driverName: '',
      capacity: '',
      registration: '',
    });
  };

  const handleDeleteTransport = (index) => {
    const updatedData = transportData.filter((_, i) => i !== index);
    setTransportData(updatedData);
  };

  return (
    <div className="transport-services">
      <h3>Transport Services</h3>
      <div className="transport-card">
        <div className="transport-form">
          <h4>{editingIndex >= 0 ? 'Edit Transport' : 'Add New Transport'}</h4>
          <div className="form-row">
            <input
              type="text"
              name="licence"
              placeholder="Licence"
              value={newTransport.licence}
              onChange={handleInputChange}
            />
            <input
              type="text"
              name="driverName"
              placeholder="Driver Name"
              value={newTransport.driverName}
              onChange={handleInputChange}
            />
            <input
              type="text"
              name="capacity"
              placeholder="Capacity"
              value={newTransport.capacity}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-row">
            <input
              type="text"
              name="registration"
              placeholder="Registration"
              value={newTransport.registration}
              onChange={handleInputChange}
            />
          </div>
          <button
            className="btn add-update-btn"
            onClick={editingIndex >= 0 ? handleUpdateTransport : handleAddTransport}
          >
            {editingIndex >= 0 ? 'Update' : 'Add'}
          </button>
        </div>
      </div>

      <div className="transport-card">
        <table>
          <thead>
            <tr>
              <th>Licence</th>
              <th>Driver Name</th>
              <th>Capacity</th>
              <th>Registration</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {transportData.map((transport, index) => (
              <tr key={index}>
                <td>{transport.licence}</td>
                <td>{transport.driverName}</td>
                <td>{transport.capacity}</td>
                <td>{transport.registration}</td>
                <td>
                  <div className="action-buttons">
                    <button className="btn edit-btn" onClick={() => handleEditTransport(index)}>
                      <FaEdit />
                    </button>
                    <button className="btn delete-btn" onClick={() => handleDeleteTransport(index)}>
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

export default TransportServices;
