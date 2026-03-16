import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Link } from 'react-router-dom';
import Badge from '../../components/Badge';
import { Package, Eye, Calendar, Clock } from 'lucide-react';
import './Orders.css';

const Orders = () => {
    const { user } = useAuth();
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/orders/myorders', {
                    headers: {
                        Authorization: `Bearer ${user.token}`,
                    },
                });
                const data = await response.json();
                if (response.ok) {
                    setOrders(data);
                }
            } catch (error) {
                console.error('Failed to fetch orders:', error);
            } finally {
                setLoading(false);
            }
        };

        if (user) {
            fetchOrders();
        }
    }, [user]);

    const getStatusColor = (status) => {
        switch (status.toLowerCase()) {
            case 'delivered': return 'success';
            case 'pending': return 'warning';
            case 'cancelled': return 'danger';
            case 'shipped': return 'info';
            default: return 'default';
        }
    };

    if (loading) return <div className="container" style={{ marginTop: '5rem' }}>Loading orders...</div>;

    return (
        <div className="container orders-page" style={{ marginTop: '5rem', marginBottom: '5rem' }}>
            <div className="section-header">
                <h1>My Orders</h1>
                <p>Track and manage your tyre purchases.</p>
            </div>

            {orders.length === 0 ? (
                <div className="empty-orders">
                    <Package size={64} color="var(--color-accent-blue)" />
                    <h2>No orders found</h2>
                    <p>Looks like you haven't placed any orders yet.</p>
                    <Link to="/shop" className="btn btn-primary">Start Shopping</Link>
                </div>
            ) : (
                <div className="orders-list">
                    {orders.map((order) => (
                        <div key={order._id} className="order-card">
                            <div className="order-main">
                                <div className="order-info">
                                    <span className="order-id">ID: #{order._id.slice(-8).toUpperCase()}</span>
                                    <div className="order-meta">
                                        <span><Calendar size={14} /> {new Date(order.createdAt).toLocaleDateString()}</span>
                                        <span><Clock size={14} /> {order.status}</span>
                                    </div>
                                </div>
                                <div className="order-brief">
                                    <div className="order-items-preview">
                                        {order.orderItems.length} {order.orderItems.length === 1 ? 'Item' : 'Items'}
                                    </div>
                                    <div className="order-total">₹{order.totalPrice.toLocaleString()}</div>
                                </div>
                                <div className="order-status-badge">
                                    <Badge variant={getStatusColor(order.status)}>{order.status}</Badge>
                                </div>
                                <Link to={`/orders/${order._id}`} className="view-details-btn">
                                    <Eye size={18} /> View Details
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Orders;
