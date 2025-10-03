import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../../Assets/CSS/inventory.css'; // Make sure to include the CSS file for styling
import Navbar from '../../Components/navbar';
import Footer from '../../Components/footer';
import axios from 'axios';

const Inventory = () => {
  const [items, setItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('All');
  const [materialTypeFilter, setMaterialTypeFilter] = useState('All');

  useEffect(() => {
    // Fetch items from the backend
    axios.get('http://localhost:8081/inventory')
      .then(response => setItems(response.data))
      .catch(error => console.error('Error fetching inventory items:', error));
  }, []);

  const filteredItems = items.filter(item => {
    const matchesSearchTerm = item.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTypeFilter = materialTypeFilter === 'All' || item.category === materialTypeFilter;
    return matchesSearchTerm && matchesTypeFilter;
  });

  return (
    <div>
      <Navbar />
      <div className="inventory">
        <div className="inventory-container">
          <h1 className="inventory-title">Current Warehouse Inventory</h1>

          <div className="inventory-filters">
            <input
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <select value={filter} onChange={(e) => setFilter(e.target.value)}>
              <option value="All">All</option>
              <option value="In Stock">In Stock</option>
              <option value="Out of Stock">Out of Stock</option>
            </select>
            <select value={materialTypeFilter} onChange={(e) => setMaterialTypeFilter(e.target.value)}>
              <option value="All">All Types</option>
              <option value="wood">Wood</option>
              <option value="steel">Steel</option>
              <option value="concrete">Concrete</option>
              <option value="metal">Metal</option>
              <option value="aggregate">Aggregate</option>
            </select>
          </div>

          <div className="inventory-items">
            {filteredItems.length > 0 ? (
              filteredItems.map((item) => (
                <div key={item.id} className="inventory-card">
                  <img
                    src={item.imageURL}
                    alt={item.name}
                    className="inventory-card-image"
                  />
                  <div className="inventory-card-details">
                    <h3 className="inventory-card-name">{item.name}</h3>
                    <p className="inventory-card-price">Price: ${item.price.toFixed(2)}</p>
                    <p className="inventory-card-category">Category: {item.category}</p>
                    <p className="inventory-card-description">{item.description}</p>
                    <Link to="/shipments">
                      <button className="inventory-card-button">Order</button>
                    </Link>
                  </div>
                </div>
              ))
            ) : (
              <p>No items found</p>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Inventory;
