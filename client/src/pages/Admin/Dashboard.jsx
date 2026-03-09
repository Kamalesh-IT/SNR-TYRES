import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Edit, Trash2 } from 'lucide-react';
import { ShopContext } from '../../context/ShopContext';
import Button from '../../components/Button';
import Badge from '../../components/Badge';
import Input from '../../components/Input';
import Select from '../../components/Select';
import MultiSelect from '../../components/MultiSelect';
import './Dashboard.css';

const DEFAULT_IMAGE = 'https://images.unsplash.com/photo-1543854589-424a73229b85?auto=format&fit=crop&q=80&w=600';

const CAR_MODELS = [
    'Maruti Swift', 'Honda City', 'Hyundai Creta', 'Toyota Innova', 
    'Mahindra XUV700', 'Tata Nexon', 'Kia Seltos', 'VW Virtus',
    'Maruti Baleno', 'Hyundai Verna', 'Toyota Fortuner', 'Mahindra Scorpio',
    'Tata Harrier', 'Kia Carens', 'VW Taigun', 'Skoda Slavia',
    'Hyundai Santro', 'Hyundai Eon', 'Maruti Wagon R', 'Tata Tiago',
    'Hyundai i20', 'Honda Jazz', 'Mahindra Thar', 'Jeep Wrangler',
    'Bajaj Pulsar', 'Royal Enfield', 'Hero Splendor', 'Long Haul Trucks',
    'Cargo Trucks', 'Highway Transport'
];

const CATEGORY_OPTIONS = [
    'Summer', 'Winter', 'All-Season', 'Other'
];

const ROAD_TYPE_OPTIONS = [
    'Highway', 'Off-Road', 'City', 'Racing', 'Other'
];

const EMPTY_FORM = {
    name: '', brand: '', category: ['All-Season'], vehicleType: 'Car', roadType: ['City'], specifications: '', suitableModels: [], description: '', price: '', stock: '', image: DEFAULT_IMAGE
};

const Dashboard = () => {
    const { products, isAdmin, deleteProduct, updateProduct, addProduct, shopDetails, updateShopInfo } = useContext(ShopContext);
    const navigate = useNavigate();
    const [isEditing, setIsEditing] = useState(false);
    const [currentProduct, setCurrentProduct] = useState(null);
    const [formData, setFormData] = useState(EMPTY_FORM);
    const [saving, setSaving] = useState(false);
    
    // Shop Settings State
    const [shopData, setShopData] = useState(shopDetails || {
        name: '',
        address: '',
        contactNumber: '',
        email: '',
        openingHours: '',
        logo: ''
    });
    const [savingShop, setSavingShop] = useState(false);

    useEffect(() => {
        if (shopDetails) {
            setShopData(shopDetails);
        }
    }, [shopDetails]);

    useEffect(() => {
        if (!isAdmin) {
            navigate('/admin');
        }
    }, [isAdmin, navigate]);

    const handleEdit = (product) => {
        setCurrentProduct(product);
        setFormData({
            name: product.name || '',
            brand: product.brand || '',
            category: Array.isArray(product.category) ? product.category : ['All-Season'],
            vehicleType: product.vehicleType || 'Car',
            roadType: Array.isArray(product.roadType) ? product.roadType : ['City'],
            specifications: product.specifications || '',
            suitableModels: Array.isArray(product.suitableModels) ? product.suitableModels : [],
            description: product.description || '',
            price: product.price || '',
            stock: product.stock || '',
            image: product.image || DEFAULT_IMAGE,
            _id: product._id,
        });
        setIsEditing(true);
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this product?')) {
            await deleteProduct(id);
        }
    };

    const handleAddNew = () => {
        setCurrentProduct(null);
        setFormData(EMPTY_FORM);
        setIsEditing(true);
    };

    const handleChange = (field) => (e) => {
        setFormData(prev => ({ ...prev, [field]: e.target.value }));
    };

    const handleSave = async (e) => {
        e.preventDefault();
        setSaving(true);
        const productData = {
            ...formData,
            price: Number(formData.price),
            stock: Number(formData.stock),
        };

        if (currentProduct) {
            await updateProduct(productData);
        } else {
            await addProduct(productData);
        }
        setSaving(false);
        setIsEditing(false);
    };

    const handleShopChange = (field) => (e) => {
        setShopData(prev => ({ ...prev, [field]: e.target.value }));
    };

    const handleSaveShop = async (e) => {
        e.preventDefault();
        setSavingShop(true);
        await updateShopInfo(shopData);
        setSavingShop(false);
        alert('Shop details updated successfully!');
    };

    if (!isAdmin) return null;

    return (
        <div className="dashboard-container container">
            <div className="dashboard-header">
                <h1>Inventory Management</h1>
                <Button variant="primary" onClick={handleAddNew}>
                    <Plus size={18} /> Add New Product
                </Button>
            </div>

            <div className="stats-cards">
                <div className="stat-card">
                    <h3>Total Products</h3>
                    <div className="stat-value">{Array.isArray(products) ? products.length : 0}</div>
                </div>
                <div className="stat-card">
                    <h3>Low Stock</h3>
                    <div className="stat-value">
                        {Array.isArray(products) ? products.filter(p => p.stock < 10).length : 0}
                    </div>
                </div>
            </div>

            <div className="inventory-table-container">
                <table className="inventory-table">
                    <thead>
                        <tr>
                            <th>Product</th>
                            <th>Brand</th>
                            <th>Vehicle</th>
                            <th>Season</th>
                            <th>Price</th>
                            <th>Stock</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Array.isArray(products) && products.map(product => (
                            <tr key={product._id || product.id}>
                                <td className="product-cell">
                                    <div className="product-name">{product.name}</div>
                                    <div className="product-size-sm">{product.description?.slice(0, 40)}</div>
                                </td>
                                <td>{product.brand}</td>
                                <td>{product.vehicleType || 'Car'}</td>
                                <td>{Array.isArray(product.category) ? product.category.join(', ') : (product.category || 'All-Season')}</td>
                                <td>₹{product.price}</td>
                                <td>
                                    <Badge variant={(product.stock || 0) < 5 ? 'danger' : 'success'}>
                                        {product.stock || 0}
                                    </Badge>
                                </td>
                                <td>
                                    <div className="action-buttons">
                                        <button onClick={() => handleEdit(product)} className="action-btn edit">
                                            <Edit size={16} />
                                        </button>
                                        <button onClick={() => handleDelete(product._id)} className="action-btn delete">
                                            <Trash2 size={16} />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {isEditing && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <h2>{currentProduct ? 'Edit Product' : 'Add New Product'}</h2>
                        <form onSubmit={handleSave}>
                            <div className="form-grid">
                                <Input label="Name" value={formData.name} onChange={handleChange('name')} required />
                                <Input label="Brand" value={formData.brand} onChange={handleChange('brand')} required />
                                <MultiSelect label="Season" options={CATEGORY_OPTIONS} value={formData.category} onChange={(val) => setFormData(prev => ({ ...prev, category: val }))} />
                                <Select label="Vehicle Type" options={['Car', 'SUV', 'Bike', 'Truck', 'Other']} value={formData.vehicleType} onChange={handleChange('vehicleType')} required />
                                <MultiSelect label="Road Type" options={ROAD_TYPE_OPTIONS} value={formData.roadType} onChange={(val) => setFormData(prev => ({ ...prev, roadType: val }))} />
                                <Input label="Description" value={formData.description} onChange={handleChange('description')} required />
                                <MultiSelect label="Suitable Models" options={CAR_MODELS} value={formData.suitableModels} onChange={(val) => setFormData(prev => ({ ...prev, suitableModels: val }))} />
                                <Input label="Price (₹)" type="number" value={formData.price} onChange={handleChange('price')} required />
                                <Input label="Stock" type="number" value={formData.stock} onChange={handleChange('stock')} required />
                                <Input label="Specifications" placeholder="e.g. 205/55 R16 91V" value={formData.specifications} onChange={handleChange('specifications')} />
                                <div className="image-input-container full-width">
                                    <Input label="Image URL" value={formData.image} onChange={handleChange('image')} />
                                    {formData.image && (
                                        <div className="image-preview-mini">
                                            <p>Preview:</p>
                                            <img src={formData.image} alt="Preview" onError={(e) => e.target.src = DEFAULT_IMAGE} />
                                        </div>
                                    )}
                                </div>
                            </div>
                            <div className="modal-actions">
                                <Button type="button" variant="secondary" onClick={() => setIsEditing(false)}>Cancel</Button>
                                <Button type="submit" variant="primary" disabled={saving}>
                                    {saving ? 'Adding to Shop...' : (currentProduct ? 'Update Product' : 'Done')}
                                </Button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            <div className="shop-settings-section">
                <div className="section-header">
                    <h2>Shop Details (MongoDB)</h2>
                    <p>Manage your shop information stored in the database.</p>
                </div>
                <form onSubmit={handleSaveShop} className="shop-settings-form">
                    <div className="form-grid">
                        <Input label="Shop Name" value={shopData?.name || ''} onChange={handleShopChange('name')} required />
                        <Input label="Contact Number" value={shopData?.contactNumber || ''} onChange={handleShopChange('contactNumber')} />
                        <Input label="Email Address" value={shopData?.email || ''} onChange={handleShopChange('email')} />
                        <Input label="Opening Hours" placeholder="e.g. Mon-Sat: 9AM - 8PM" value={shopData?.openingHours || ''} onChange={handleShopChange('openingHours')} />
                        <Input label="Shop Address" value={shopData?.address || ''} onChange={handleShopChange('address')} className="full-width" />
                    </div>
                    <div className="form-actions">
                        <Button type="submit" variant="primary" disabled={savingShop}>
                            {savingShop ? 'Updating MongoDB...' : 'Update Shop Details'}
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Dashboard;

