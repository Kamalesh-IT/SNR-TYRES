import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import Badge from '../../components/Badge';
import { ChevronLeft, Package, MapPin, CreditCard, Calendar, Truck } from 'lucide-react';
import './Orders.css';

const OrderDetails = () => {
    const { id } = useParams();
    const { user } = useAuth();
    const [order, setOrder] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchOrder = async () => {
            try {
                const response = await fetch(`http://localhost:5000/api/orders/${id}`, {
                    headers: {
                        Authorization: `Bearer ${user.token}`,
                    },
                });
                const data = await response.json();
                if (response.ok) {
                    setOrder(data);
                }
            } catch (error) {
                console.error('Failed to fetch order details:', error);
            } finally {
                setLoading(false);
            }
        };

        if (user && id) {
            fetchOrder();
        }
    }, [user, id]);

    const getStatusColor = (status) => {
        switch (status?.toLowerCase()) {
            case 'delivered': return 'success';
            case 'pending': return 'warning';
            case 'cancelled': return 'danger';
            case 'shipped': return 'info';
            default: return 'default';
        }
    };

    if (loading) return <div className="container" style={{ marginTop: '5rem' }}>Loading order details...</div>;
    if (!order) return <div className="container" style={{ marginTop: '5rem' }}>Order not found.</div>;

    return (
        <div className="container order-details-page" style={{ marginTop: '5rem', marginBottom: '5rem' }}>
            <div className="page-header">
                <Link to="/orders" className="back-link">
                    <ChevronLeft size={20} /> Back to Orders
                </Link>
                <div className="header-main">
                    <h1>Order #{order._id.slice(-8).toUpperCase()}</h1>
                    <Badge variant={getStatusColor(order.status)}>{order.status}</Badge>
                </div>
            </div>

            <div className="order-details-grid">
                <div className="order-main-content">
                    <div className="details-card">
                        <h3><Package size={20} /> Items in Order</h3>
                        <div className="order-items">
                            {order.orderItems.map((item, index) => (
                                <div key={index} className="order-item-row">
                                    <img src={item.image} alt={item.name} className="item-img" />
                                    <div className="item-info">
                                        <h4>{item.name}</h4>
                                        <p>Quantity: {item.quantity}</p>
                                    </div>
                                    <div className="item-price">₹{item.price.toLocaleString()}</div>
                                </div>
                            ))}
                        </div>
                        <div className="order-summary-footer">
                            <div className="summary-row">
                                <span>Subtotal</span>
                                <span>₹{order.totalPrice.toLocaleString()}</span>
                            </div>
                            <div className="summary-row">
                                <span>Shipping</span>
                                <span>Free</span>
                            </div>
                            <div className="summary-row total">
                                <span>Total Price</span>
                                <span>₹{order.totalPrice.toLocaleString()}</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="order-sidebar">
                    <div className="details-card">
                        <h3><MapPin size={20} /> Shipping Address</h3>
                        <div className="address-info">
                            <p><strong>{order.user.name}</strong></p>
                            <p>{order.shippingAddress.address}</p>
                            <p>{order.shippingAddress.city}, {order.shippingAddress.postalCode}</p>
                        </div>
                    </div>

                    <div className="details-card">
                        <h3><CreditCard size={20} /> Payment Method</h3>
                        <p>{order.paymentMethod}</p>
                    </div>

                    <div className="details-card">
                        <h3><Calendar size={20} /> Order Info</h3>
                        <div className="info-row">
                            <span>Placed on:</span>
                            <span>{new Date(order.createdAt).toLocaleDateString()}</span>
                        </div>
                        <div className="info-row">
                            <span>Current Status:</span>
                            <span>{order.status}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OrderDetails;
