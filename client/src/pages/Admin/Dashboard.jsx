import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Edit, Trash2 } from 'lucide-react';
import { ShopContext } from '../../context/ShopContext';
import Button from '../../components/Button';
import Badge from '../../components/Badge';
import Input from '../../components/Input';
import './Dashboard.css';

const DEFAULT_IMAGE = 'https://images.unsplash.com/photo-1543854589-424a73229b85?auto=format&fit=crop&q=80&w=600';

const EMPTY_FORM = {
    name: '', brand: '', category: '', description: '', price: '', stock: '', image: DEFAULT_IMAGE
};

const Dashboard = () => {
    const { products, isAdmin, deleteProduct, updateProduct, addProduct } = useContext(ShopContext);
    const navigate = useNavigate();
    const [isEditing, setIsEditing] = useState(false);
    const [currentProduct, setCurrentProduct] = useState(null);
    const [formData, setFormData] = useState(EMPTY_FORM);
    const [saving, setSaving] = useState(false);

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
            category: product.category || '',
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
                    <div className="stat-value">{products.length}</div>
                </div>
                <div className="stat-card">
                    <h3>Low Stock</h3>
                    <div className="stat-value">{products.filter(p => p.stock < 10).length}</div>
                </div>
            </div>

            <div className="inventory-table-container">
                <table className="inventory-table">
                    <thead>
                        <tr>
                            <th>Product</th>
                            <th>Brand</th>
                            <th>Category</th>
                            <th>Price</th>
                            <th>Stock</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map(product => (
                            <tr key={product._id}>
                                <td className="product-cell">
                                    <div className="product-name">{product.name}</div>
                                    <div className="product-size-sm">{product.description?.slice(0, 40)}</div>
                                </td>
                                <td>{product.brand}</td>
                                <td>{product.category}</td>
                                <td>₹{product.price}</td>
                                <td>
                                    <Badge variant={product.stock < 5 ? 'danger' : 'success'}>
                                        {product.stock}
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
                                <Input label="Category" placeholder="e.g. Summer, Winter, All-Season" value={formData.category} onChange={handleChange('category')} required />
                                <Input label="Description" value={formData.description} onChange={handleChange('description')} required />
                                <Input label="Price (₹)" type="number" value={formData.price} onChange={handleChange('price')} required />
                                <Input label="Stock" type="number" value={formData.stock} onChange={handleChange('stock')} required />
                                <Input label="Image URL" value={formData.image} onChange={handleChange('image')} />
                            </div>
                            <div className="modal-actions">
                                <Button type="button" variant="secondary" onClick={() => setIsEditing(false)}>Cancel</Button>
                                <Button type="submit" variant="primary" disabled={saving}>
                                    {saving ? 'Saving...' : 'Save Changes'}
                                </Button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Dashboard;

