import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Edit, Trash2, Package } from 'lucide-react';
import { ShopContext } from '../../context/ShopContext';
import Button from '../../components/Button';
import Badge from '../../components/Badge';
import Input from '../../components/Input';
import './Dashboard.css';

const Dashboard = () => {
    const { products, isAdmin, deleteProduct, updateProduct, addProduct } = useContext(ShopContext);
    const navigate = useNavigate();
    const [isEditing, setIsEditing] = useState(false);
    const [currentProduct, setCurrentProduct] = useState(null);

    // Form State
    const [formData, setFormData] = useState({
        name: '', brand: '', price: '', size: '', type: '', stock: ''
    });

    useEffect(() => {
        if (!isAdmin) {
            navigate('/admin');
        }
    }, [isAdmin, navigate]);

    const handleEdit = (product) => {
        setCurrentProduct(product);
        setFormData({ ...product });
        setIsEditing(true);
    };

    const handleDelete = (id) => {
        if (window.confirm('Are you sure you want to delete this product?')) {
            deleteProduct(id);
        }
    };

    const handleAddNew = () => {
        setCurrentProduct(null);
        setFormData({ name: '', brand: '', price: '', size: '', type: '', stock: '', image: 'https://images.unsplash.com/photo-1543854589-424a73229b85?auto=format&fit=crop&q=80&w=600' });
        setIsEditing(true);
    };

    const handleSave = (e) => {
        e.preventDefault();
        const productData = {
            ...formData,
            price: Number(formData.price),
            stock: Number(formData.stock),
            rating: formData.rating || 5 // Default rating for new
        };

        if (currentProduct) {
            updateProduct(productData);
        } else {
            addProduct({ ...productData, rating: 5, image: 'https://images.unsplash.com/photo-1543854589-424a73229b85?auto=format&fit=crop&q=80&w=600' });
        }
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
                            <tr key={product.id}>
                                <td className="product-cell">
                                    <div className="product-name">{product.name}</div>
                                    <div className="product-size-sm">{product.size}</div>
                                </td>
                                <td>{product.brand}</td>
                                <td>{product.type}</td>
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
                                        <button onClick={() => handleDelete(product.id)} className="action-btn delete">
                                            <Trash2 size={16} />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Edit/Add Modal Overlay */}
            {isEditing && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <h2>{currentProduct ? 'Edit Product' : 'Add New Product'}</h2>
                        <form onSubmit={handleSave}>
                            <div className="form-grid">
                                <Input label="Name" value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} required />
                                <Input label="Brand" value={formData.brand} onChange={e => setFormData({ ...formData, brand: e.target.value })} required />
                                <Input label="Size" value={formData.size} onChange={e => setFormData({ ...formData, size: e.target.value })} required />
                                <Input label="Type" value={formData.type} onChange={e => setFormData({ ...formData, type: e.target.value })} required />
                                <Input label="Price" type="number" value={formData.price} onChange={e => setFormData({ ...formData, price: e.target.value })} required />
                                <Input label="Stock" type="number" value={formData.stock} onChange={e => setFormData({ ...formData, stock: e.target.value })} required />
                            </div>
                            <div className="modal-actions">
                                <Button type="button" variant="secondary" onClick={() => setIsEditing(false)}>Cancel</Button>
                                <Button type="submit" variant="primary">Save Changes</Button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Dashboard;
