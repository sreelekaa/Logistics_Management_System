import React, { useState,useEffect } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useNavigate } from 'react-router-dom';
import { faShoppingCart, faWallet, faUsers, faComments } from '@fortawesome/free-solid-svg-icons';
import { faTruck, faRoute, faWarehouse, faDollarSign, faChartBar, faFileAlt, faCog, faSignOutAlt, faChevronLeft, faChevronRight, faUser, faChartPie, faListAlt, faTable, faTrash, faEdit,faBox } from '@fortawesome/free-solid-svg-icons';
import { jsPDF } from 'jspdf';
import Modal from 'react-modal';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Link } from 'react-router-dom';
import '../../Assets/CSS/dashboard.css'; // Assume this file contains the necessary CSS

const AdminDashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [activeSection, setActiveSection] = useState('dashboard');

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleSidebarItemClick = (section) => {
    setActiveSection(section);
  };

  return (
    <div className="dashboard">
      <Sidebar isOpen={isSidebarOpen} onSidebarItemClick={handleSidebarItemClick} />
      <div className={`main-content ${isSidebarOpen ? 'sidebar-open' : 'sidebar-closed'}`}>
        <TopBar toggleSidebar={toggleSidebar} isSidebarOpen={isSidebarOpen} />
        <Content activeSection={activeSection} />
      </div>
    </div>
  );
};

const Sidebar = ({ isOpen, onSidebarItemClick }) => (
  <div className={`sidebar ${isOpen ? 'open' : 'closed'}`}>
    <ul>
      <li onClick={() => onSidebarItemClick('dashboard')}><FontAwesomeIcon icon={faChartBar} /> {isOpen && 'Dashboard'}</li>
      <li onClick={() => onSidebarItemClick('transports')}><FontAwesomeIcon icon={faTruck} /> {isOpen && 'Transports'}</li>
      <li onClick={() => onSidebarItemClick('inventory')}><FontAwesomeIcon icon={faWarehouse} /> {isOpen && 'Inventory'}</li>
      <li onClick={() => onSidebarItemClick('suppliers')}><FontAwesomeIcon icon={faRoute} /> {isOpen && 'Suppliers'}</li>
      <li onClick={() => onSidebarItemClick('orders')}><FontAwesomeIcon icon={faFileAlt} /> {isOpen && 'Orders'}</li>
      <li onClick={() => onSidebarItemClick('tracking')}><FontAwesomeIcon icon={faBox} /> {isOpen && 'Tracking'}</li>
      <li><Link to="/login"><FontAwesomeIcon icon={faSignOutAlt} /> {isOpen && 'Logout'}</Link></li>
    </ul>
  </div>
);

const TopBar = ({ toggleSidebar, isSidebarOpen }) => (
  <div className="top-bar">
    <button className="sidebar-toggle" onClick={toggleSidebar}>
      <FontAwesomeIcon icon={isSidebarOpen ? faChevronLeft : faChevronRight} />
    </button>
    <div className="user-info">
      <FontAwesomeIcon icon={faUser} />
      <Link to ='/'><span>Jenisha Angel B</span></Link>
    </div>
    <div className="nav-items">
      <Link to="/calendar"><span>Calendar</span></Link>
      <Link to="/statistics"><span>Statistics</span></Link>
      <Link to="/employee"><span>Employee</span></Link>
    </div>
  </div>
);



const Content = ({ activeSection }) => {
  switch (activeSection) {
    case 'dashboard':
      return <Dashboard />;
    case 'transports':
      return <Transports />;
    case 'inventory':
      return <Inventory />;
    case 'suppliers':
      return <Suppliers />;
    case 'orders':
      return <OrderManagement />;
    case 'tracking':
      return <TrackingManagement />;
    case 'logout':
      return <Logout />; // Render as JSX
    default:
      return <AdminDashboard />; // Ensure this component is correctly named and imported
  }
};



const Logout=()=> {
  const navigate = useNavigate();

  useEffect(() => {
    sessionStorage.removeItem('adminToken');
    sessionStorage.removeItem('tokenExpiration');

    // Redirect to login page
    navigate('/login');
  }, [navigate]);

  return <p>Logging out...</p>; // Display a message during the logout process
}


const Dashboard = () => (
  <div className="dashboard-content">
    <div className="widget-container">
    <Widget title="Total Orders" value="867" icon={faShoppingCart} />
    <Widget title="Total Income" value="$52,945" icon={faWallet} />
    <Widget title="Total Users" value="24.5K" icon={faUsers} />
    <Widget title="Comments" value="869" icon={faComments} />
  </div>
    <div className="dash-chart-container">
      <RevenueChart />
    </div>
  </div>
);

const data = [
  { name: 'Jan', value: 30 },
  { name: 'Feb', value: 20 },
  { name: 'Mar', value: 50 },
  { name: 'Apr', value: 40 },
  { name: 'May', value: 70 },
  { name: 'Jun', value: 50 },
  { name: 'Jul', value: 80 },
];
const Widget = ({ title, value, icon }) => (
  <div className="widget">
    <div className="widget-icon">
      <FontAwesomeIcon icon={icon} />
    </div>
    <div className="widget-info">
      <h3>{title}</h3>
      <p>{value}</p>
    </div>
    <div className="widget-chart">
      <ResponsiveContainer width="100%" height={40}>
        <LineChart data={data}>
          <Line type="monotone" dataKey="value" stroke="#ffffff" strokeWidth={2} />
          <XAxis dataKey="name" hide />
          <YAxis hide />
          <Tooltip />
        </LineChart>
      </ResponsiveContainer>
    </div>
  </div>
);

const RevenueChart = () => {
  const data = [
    { name: 'March', revenue: 10000 },
    { name: 'April', revenue: 15000 },
    { name: 'May', revenue: 20000 },
    { name: 'June', revenue: 25000 },
    { name: 'July', revenue: 30000 },
    { name: 'August', revenue: 50000 },
  ];

  return (
    <div className="chart">
      <h3>Total Revenue (Last 6 months)</h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="revenue" stroke="#8884d8" activeDot={{ r: 8 }} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

const Transports = () => {
  // Example data for transports
  const allTransportsData = [
    { id: 1, type: 'Land', vehicle: 'Truck', identifier: 'HDWHW3G', origin: 'A1 Fulfillment', destination: 'Redwood Distribution', status: 'Active' },
    { id: 2, type: 'Water', vehicle: 'Cargo Ship', identifier: 'OCEAN1', origin: 'Port of Shanghai', destination: 'Port of Los Angeles', status: 'In Transit' },
    { id: 3, type: 'Air', vehicle: 'Cargo Plane', identifier: 'AIR123', origin: 'JFK Airport', destination: 'Heathrow Airport', status: 'Completed' },
    { id: 4, type: 'Land', vehicle: 'Truck', identifier: 'MXXKF31', origin: 'Lakeview Shipping', destination: 'Keystone Packaging', status: 'Completed' },
    { id: 5, type: 'Air', vehicle: 'Cargo Plane', identifier: 'AIR456', origin: 'LAX', destination: 'Narita Airport', status: 'Delayed' },
    { id: 6, type: 'Water', vehicle: 'Cargo Ship', identifier: 'SEA321', origin: 'Port of Singapore', destination: 'Port of Sydney', status: 'Active' },
    { id: 7, type: 'Land', vehicle: 'Van', identifier: 'LAND123', origin: 'Central Depot', destination: 'Eastside Warehouse', status: 'In Transit' },
    { id: 8, type: 'Water', vehicle: 'Container Ship', identifier: 'WATER987', origin: 'Port of Hamburg', destination: 'Port of New York', status: 'Active' },
    { id: 9, type: 'Air', vehicle: 'Jet', identifier: 'JET321', origin: 'Dubai International Airport', destination: 'Paris Charles de Gaulle Airport', status: 'Completed' },
    { id: 10, type: 'Land', vehicle: 'Freight Train', identifier: 'TRAIN123', origin: 'Chicago Rail Yard', destination: 'Los Angeles Station', status: 'In Transit' },
  ];

  // State to manage filters and search term
  const [filter, setFilter] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [transportsData, setTransportsData] = useState(allTransportsData);

  const handleFilterChange = (type) => {
    setFilter(type);
    if (type === 'All') {
      setTransportsData(allTransportsData);
    } else {
      setTransportsData(allTransportsData.filter(transport => transport.type === type));
    }
  };

  const filteredTransports = transportsData.filter(transport => {
    return (
      transport.vehicle.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transport.identifier.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transport.origin.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transport.destination.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  return (
    <div className="transports">
      <h3>Transports</h3>
      <div className="filters">
        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button onClick={() => handleFilterChange('All')} className={filter === 'All' ? 'active' : ''}>All</button>
        <button onClick={() => handleFilterChange('Land')} className={filter === 'Land' ? 'active' : ''}>Land</button>
        <button onClick={() => handleFilterChange('Water')} className={filter === 'Water' ? 'active' : ''}>Water</button>
        <button onClick={() => handleFilterChange('Air')} className={filter === 'Air' ? 'active' : ''}>Air</button>
      </div>
      <table>
        <thead>
          <tr>
            <th>Type</th>
            <th>Vehicle</th>
            <th>Identifier</th>
            <th>Origin</th>
            <th>Destination</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {filteredTransports.map((transport) => (
            <tr key={transport.id}>
              <td>{transport.type}</td>
              <td>{transport.vehicle}</td>
              <td>{transport.identifier}</td>
              <td>{transport.origin}</td>
              <td>{transport.destination}</td>
              <td>{transport.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};


const Inventory = ({ onUpdateInventory }) => {
  const [items, setItems] = useState([]);
  const [editingItem, setEditingItem] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('All');
  const [materialTypeFilter, setMaterialTypeFilter] = useState('All');

  useEffect(() => {
    axios.get('http://localhost:8081/inventory')
      .then(response => {
        setItems(response.data);
      })
      .catch(error => {
        console.error("There was an error fetching the inventory data!", error);
      });
  }, []);

  const addItem = (formData) => {
    axios.post('http://localhost:8081/inventory', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      },
    })
    .then(response => {
      setItems([...items, response.data]);
    })
    .catch(error => {
      console.error("There was an error adding the item!", error.response ? error.response.data : error.message);
    });
  };
  
  const editItem = (formData) => {
    axios.put(`http://localhost:8081/inventory/${editingItem.id}`, formData)
      .then(response => {
        setItems(items.map(item => (item.id === editingItem.id ? response.data : item)));
        if (onUpdateInventory) onUpdateInventory(response.data);
        setEditingItem(null);
      })
      .catch(error => {
        console.error("There was an error updating the item!", error);
      });
  };

  const deleteItem = (id) => {
    axios.delete(`http://localhost:8081/inventory/${id}`)
      .then(() => {
        setItems(items.filter(item => item.id !== id));
      })
      .catch(error => {
        console.error("There was an error deleting the item!", error);
      });
  };

  const filteredItems = items.filter(item => {
    const matchesSearchTerm = item.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTypeFilter = materialTypeFilter === 'All' || item.category === materialTypeFilter;
    return matchesSearchTerm && matchesTypeFilter;
  });

  return (
    <div className="inventory-management">
      <h2>Inventory Management</h2>
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
          <option value="Wood">Wood</option>
          <option value="Steel">Steel</option>
          <option value="Concrete">Concrete</option>
          <option value="Metal">Metal</option>
          <option value="Aggregate">Aggregate</option>
        </select>
      </div>
      <table className="inventory-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Quantity</th>
            <th>Description</th>
            <th>Category</th>
            <th>Price</th>
            <th>Image</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredItems.map(item => (
            <tr key={item.id}>
              <td>{item.name}</td>
              <td>{item.quantity}</td>
              <td>{item.description}</td>
              <td>{item.category}</td>
              <td>${item.price.toFixed(2)}</td>
              <td>
                {item.imageURL && <img src={item.imageURL} alt={item.name} style={{ width: '100px', height: 'auto' }} />}
              </td>
              <td>
                <button onClick={() => setEditingItem(item)}>Edit</button>
                <button onClick={() => deleteItem(item.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        <InventoryForm
          item={editingItem}
          onSave={editingItem ? editItem : addItem}
          onCancel={() => setEditingItem(null)}
        />
      </div>
    </div>
  );
};


const InventoryForm = ({ item = {}, onSave, onCancel }) => {
  const [name, setName] = useState(item?.name || '');
  const [quantity, setQuantity] = useState(item?.quantity || 0);
  const [description, setDescription] = useState(item?.description || '');
  const [category, setCategory] = useState(item?.category || ''); 
  const [price, setPrice] = useState(item?.price || 0);
  const [image, setImage] = useState(null);

  useEffect(() => {
    setName(item?.name || '');
    setQuantity(item?.quantity || 0);
    setDescription(item?.description || '');
    setCategory(item?.category || '');
    setPrice(item?.price || 0);
    setImage(null); 
  }, [item]);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const formData = new FormData();
    formData.append('name', name);
    formData.append('quantity', quantity);
    formData.append('description', description);
    formData.append('category', category);
    formData.append('price', price);
    if (image) {
      formData.append('image', image);
    }

    onSave(formData);
    if (onCancel) onCancel();
  };

  return (
    <form onSubmit={handleSubmit} className="inventory-form">
      <input
        type="text"
        placeholder="Item Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <input
        type="number"
        placeholder="Quantity"
        value={quantity}
        onChange={(e) => setQuantity(Number(e.target.value))}
        required
      />
      <textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
      />
      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        required
      >
        <option value="">Select Category</option>
        <option value="Wood">Wood</option>
        <option value="Steel">Steel</option>
        <option value="Concrete">Concrete</option>
        <option value="Metal">Metal</option>
        <option value="Aggregate">Aggregate</option>
      </select>
      <input
        type="number"
        placeholder="Price"
        value={price}
        onChange={(e) => setPrice(Number(e.target.value))}
        required
      />
      <input
        type="file"
        onChange={(e) => setImage(e.target.files[0])}
      />
      <button type="submit">Save</button>
      {onCancel && <button type="button" onClick={onCancel}>Cancel</button>}
    </form>
  );
};






const Suppliers = ({ onUpdateInventory }) => {
  const initialSuppliers = [
    { id: 1, name: 'ABC Lumber', supplied: 'Pine Wood', quantity: 100, category: 'Wood', contact: '123-456-7890' },
    { id: 2, name: 'Steel Co.', supplied: 'Steel Beams', quantity: 50, category: 'Steel', contact: '987-654-3210' },
    { id: 3, name: 'Concrete Supply Ltd.', supplied: 'Concrete Blocks', quantity: 300, category: 'Concrete', contact: '555-123-4567' },
    { id: 4, name: 'Oakwood Enterprises', supplied: 'Oak Wood', quantity: 80, category: 'Wood', contact: '444-567-8901' },
    { id: 5, name: 'Cement Makers', supplied: 'Cement Bags', quantity: 150, category: 'Concrete', contact: '222-333-4444' },
    { id: 6, name: 'Aluminum Solutions', supplied: 'Aluminum Sheets', quantity: 50, category: 'Metal', contact: '666-777-8888' },
  ];

  const [suppliers, setSuppliers] = useState(initialSuppliers);
  const [editingSupplier, setEditingSupplier] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const addSupplier = (newSupplier) => {
    const newSupplierWithId = { ...newSupplier, id: suppliers.length + 1 };
    setSuppliers([...suppliers, newSupplierWithId]);
    if (onUpdateInventory) onUpdateInventory(newSupplierWithId);
  };

  const handleEdit = (updatedSupplier) => {
    setSuppliers(
      suppliers.map(supplier =>
        supplier.id === updatedSupplier.id ? updatedSupplier : supplier
      )
    );
    if (onUpdateInventory) onUpdateInventory(updatedSupplier);
  };

  const handleDelete = (id) => {
    setSuppliers(suppliers.filter(supplier => supplier.id !== id));
  };

  const filteredSuppliers = suppliers.filter(supplier =>
    supplier.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="supplier">
      <h3>Supplier Management</h3>
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search suppliers..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Supplied</th>
            <th>Quantity</th>
            <th>Category</th>
            <th>Contact</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredSuppliers.map(supplier => (
            <tr key={supplier.id}>
              <td>{supplier.name}</td>
              <td>{supplier.supplied}</td>
              <td>{supplier.quantity}</td>
              <td>{supplier.category}</td>
              <td>{supplier.contact}</td>
              <td>
                <button onClick={() => setEditingSupplier(supplier)}>Edit</button>
                <button onClick={() => handleDelete(supplier.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="form-container">
        <SupplierForm
          supplier={editingSupplier}
          onSave={editingSupplier ? handleEdit : addSupplier}
          onCancel={() => setEditingSupplier(null)}
        />
      </div>
    </div>
  );
};

const SupplierForm = ({ supplier = {}, onSave, onCancel }) => {
  const [name, setName] = useState(supplier ? supplier.name : '');
  const [supplied, setSupplied] = useState(supplier ? supplier.supplied : '');
  const [quantity, setQuantity] = useState(supplier ? supplier.quantity : 0);
  const [category, setCategory] = useState(supplier ? supplier.category : '');
  const [contact, setContact] = useState(supplier ? supplier.contact : '');

  useEffect(() => {
    setName(supplier ? supplier.name : '');
    setSupplied(supplier ? supplier.supplied : '');
    setQuantity(supplier ? supplier.quantity : 0);
    setCategory(supplier ? supplier.category : '');
    setContact(supplier ? supplier.contact : '');
  }, [supplier]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({ ...supplier, name, supplied, quantity, category, contact });
    if (onCancel) onCancel();
  };

  return (
    <form onSubmit={handleSubmit} className="supplier-form">
      <input
        type="text"
        placeholder="Supplier Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Supplied Item"
        value={supplied}
        onChange={(e) => setSupplied(e.target.value)}
        required
      />
      <input
        type="number"
        placeholder="Quantity"
        value={quantity}
        onChange={(e) => setQuantity(Number(e.target.value))}
        required
      />
      <input
        type="text"
        placeholder="Category"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Contact Number"
        value={contact}
        onChange={(e) => setContact(e.target.value)}
        required
      />
      <button type="submit">Save</button>
      {onCancel && <button type="button" onClick={onCancel}>Cancel</button>}
    </form>
  );
};


Modal.setAppElement('#root');

const OrderManagement = () => {
  const [orders, setOrders] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [newOrder, setNewOrder] = useState({
    selectedService: '',
    customerName: '',
    email: '',
    phoneNumber: '',
    address: '',
    deliveryDate: '',
    shipmentWeight: '',
    packageDimensions: '',
    goodsType: '',
    warehouseDetails: '',
    warehouseLocation: '',
    warehouseSpace: '',
    warehouseGoods: '',
    warehouseGoodsQuantity: '',
    status: ''
  });

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await axios.get('http://localhost:8081/shipments');
      setOrders(response.data);
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleDownloadBill = (order) => {
    const doc = new jsPDF();
    doc.text(`Order ID: ${order.id}`, 10, 10);
    doc.text(`Purchase Point: ${order.selectedService}`, 10, 20);
    doc.text(`Purchase Date: ${order.deliveryDate}`, 10, 30);
    doc.text(`Bill-to Name: ${order.customerName}`, 10, 40);
    doc.text(`Ship-to Name: ${order.customerName}`, 10, 50);
    doc.text(`Grand Total: ${order.shipmentWeight}`, 10, 60);
    doc.text(`Status: ${order.status}`, 10, 70);
    doc.save(`Order_${order.id}_Bill.pdf`);
  };

  const handleDelete = async (orderId) => {
    try {
      await axios.delete(`http://localhost:8081/shipments/delete/${orderId}`);
      setOrders(orders.filter(order => order.id !== orderId));
    } catch (error) {
      console.error('Error deleting order:', error);
    }
  };

  const filteredOrders = orders.filter(order => String(order.id).includes(searchTerm));
  

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewOrder(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8081/shipments/add', newOrder);
      setOrders([...orders, response.data]);
      setNewOrder({
        selectedService: '',
        customerName: '',
        email: '',
        phoneNumber: '',
        address: '',
        deliveryDate: '',
        shipmentWeight: '',
        packageDimensions: '',
        goodsType: '',
        warehouseDetails: '',
        warehouseLocation: '',
        warehouseSpace: '',
        warehouseGoods: '',
        warehouseGoodsQuantity: '',
        status: ''
      });
      closeModal();
    } catch (error) {
      console.error('Error creating order:', error);
    }
  };

  return (
    <div className="order-management">
      <header>
        <h1>Orders</h1>
        <button className="create-order" onClick={openModal}>Create New Order</button>
      </header>
      <div className="filters">
        <input
          type="text"
          id="search"
          placeholder="Search by keyword"
          value={searchTerm}
          onChange={handleSearch}
        />
        <button id="filter-btn">Filters</button>
      </div>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Purchase Point</th>
            <th>Purchase Date</th>
            <th>Bill-to Name</th>
            <th>Ship-to Name</th>
            <th>Grand Total</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredOrders.map(order => (
            <tr key={order.id}>
              <td>{order.id}</td>
              <td>{order.selectedService}</td>
              <td>{order.deliveryDate}</td>
              <td>{order.customerName}</td>
              <td>{order.customerName}</td>
              <td>{order.shipmentWeight}</td>
              <td>{order.status}</td>
              <td>
                <button className='download' onClick={() => handleDownloadBill(order)}>Download</button>
                <button className='delete' onClick={() => handleDelete(order.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <Modal
        className="modal"
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Create New Order"
        ariaHideApp={false} // Disable for testing or adjust based on your needs
      >
        <div className="modal-header">
          <h2>Create New Order</h2>
          <button className="close-button" onClick={closeModal}>×</button>
        </div>
        <form onSubmit={handleSubmit}>
          <label>
            Purchase Point:
            <input
              type="text"
              name="selectedService"
              value={newOrder.selectedService}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Customer Name:
            <input
              type="text"
              name="customerName"
              value={newOrder.customerName}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Email:
            <input
              type="email"
              name="email"
              value={newOrder.email}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Phone Number:
            <input
              type="tel"
              name="phoneNumber"
              value={newOrder.phoneNumber}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Address:
            <input
              type="text"
              name="address"
              value={newOrder.address}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Delivery Date:
            <input
              type="date"
              name="deliveryDate"
              value={newOrder.deliveryDate}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Shipment Weight:
            <input
              type="number"
              name="shipmentWeight"
              value={newOrder.shipmentWeight}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Package Dimensions:
            <input
              type="text"
              name="packageDimensions"
              value={newOrder.packageDimensions}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Goods Type:
            <input
              type="text"
              name="goodsType"
              value={newOrder.goodsType}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Warehouse Details:
            <select
              name="warehouseDetails"
              value={newOrder.warehouseDetails}
              onChange={handleChange}
              required
            >
              <option value="">Select Details</option>
              <option value="Needed">Warehouse Needed</option>
              <option value="Goods Needed">Goods Needed</option>
              <option value="None">None</option>
            </select>
          </label>
          {newOrder.warehouseDetails === 'Needed' && (
            <>
              <label>
                Warehouse Location:
                <input
                  type="text"
                  name="warehouseLocation"
                  value={newOrder.warehouseLocation}
                  onChange={handleChange}
                />
              </label>
              <label>
                Warehouse Space:
                <input
                  type="number"
                  name="warehouseSpace"
                  value={newOrder.warehouseSpace}
                  onChange={handleChange}
                />
              </label>
            </>
          )}
          {newOrder.warehouseDetails === 'Goods Needed' && (
            <>
              <label>
                Warehouse Goods:
                <input
                  type="text"
                  name="warehouseGoods"
                  value={newOrder.warehouseGoods}
                  onChange={handleChange}
                />
              </label>
              <label>
                Warehouse Goods Quantity:
                <input
                  type="number"
                  name="warehouseGoodsQuantity"
                  value={newOrder.warehouseGoodsQuantity}
                  onChange={handleChange}
                />
              </label>
            </>
          )}
          <label>
            Status:
            <input
              type="text"
              name="status"
              value={newOrder.status}
              onChange={handleChange}
              required
            />
          </label>
          <div className="button-container">
            <button type="submit">Submit</button>
            <button type="button" onClick={closeModal}>Cancel</button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

const TrackingModal = ({ isOpen, onRequestClose, track, onSave }) => {
  const [formData, setFormData] = useState({
    carrier: '',
    trackingNumber: '',
    status: '',
    estimatedDelivery: ''
  });

  useEffect(() => {
    if (track) {
      setFormData({
        carrier: track.carrier,
        trackingNumber: track.trackingNumber,
        status: track.status,
        estimatedDelivery: track.estimatedDelivery
      });
    } else {
      setFormData({
        carrier: '',
        trackingNumber: '',
        status: '',
        estimatedDelivery: ''
      });
    }
  }, [track]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({ ...formData, id: track ? track.id : '' });
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Tracking Details"
      className="modal"
    >
      <div className="modal-header">
        <h2>{track ? 'Edit Tracking' : 'Add New Tracking'}</h2>
        <button className="close-button" onClick={onRequestClose}>×</button>
      </div>
      <form onSubmit={handleSubmit}>
        <label>
          Carrier:
          <input type="text" name="carrier" value={formData.carrier} onChange={handleChange} required />
        </label>
        <label>
          Tracking Number:
          <input type="text" name="trackingNumber" value={formData.trackingNumber} onChange={handleChange} required />
        </label>
        <label>
          Status:
          <input type="text" name="status" value={formData.status} onChange={handleChange} required />
        </label>
        <label>
          Estimated Delivery:
          <input type="date" name="estimatedDelivery" value={formData.estimatedDelivery} onChange={handleChange} required />
        </label>
        <div className="button-container">
          <button type="submit">Save</button>
          <button type="button" onClick={onRequestClose}>Cancel</button>
        </div>
      </form>
    </Modal>
  );
};

const TrackingManagement = () => {
  const [tracks, setTracks] = useState([
    // Sample tracking data
    {
      id: 'TRK123',
      carrier: 'FedEx',
      trackingNumber: '1234567890',
      status: 'In Transit',
      estimatedDelivery: '2024-08-10'
    },
    {
      id: 'TRK124',
      carrier: 'UPS',
      trackingNumber: '0987654321',
      status: 'Delivered',
      estimatedDelivery: '2024-08-01'
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedTrack, setSelectedTrack] = useState(null);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredTracks = tracks.filter(track =>
    track.id.includes(searchTerm) ||
    track.carrier.toLowerCase().includes(searchTerm.toLowerCase()) ||
    track.trackingNumber.includes(searchTerm)
  );

  const openModal = (track = null) => {
    setSelectedTrack(track);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setSelectedTrack(null);
    setModalIsOpen(false);
  };

  return (
    <div className="tracking-management">
      <header>
        <h1>Tracking Management</h1>
        <button className="add-track" onClick={() => openModal()}>Add New Tracking</button>
      </header>
      <div className="filters">
        <input
          type="text"
          id="search"
          placeholder="Search by ID, Carrier, or Tracking Number"
          value={searchTerm}
          onChange={handleSearch}
        />
      </div>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Carrier</th>
            <th>Tracking Number</th>
            <th>Status</th>
            <th>Estimated Delivery</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredTracks.map(track => (
            <tr key={track.id}>
              <td>{track.id}</td>
              <td>{track.carrier}</td>
              <td>{track.trackingNumber}</td>
              <td>{track.status}</td>
              <td>{track.estimatedDelivery}</td>
              <td>
                <button onClick={() => openModal(track)}>Edit</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <TrackingModal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        track={selectedTrack}
        onSave={(updatedTrack) => {
          if (selectedTrack) {
            // Update existing track
            setTracks(tracks.map(track => track.id === updatedTrack.id ? updatedTrack : track));
          } else {
            // Add new track
            setTracks([...tracks, { ...updatedTrack, id: `TRK${Date.now()}` }]);
          }
          closeModal();
        }}
      />
    </div>
  );
};



// Add more components like Transports, Inventory, Suppliers, Reports as needed

export default AdminDashboard;
