import React, { useContext, useState } from 'react';
import { Trash2, Plus, Minus, ArrowRight, CheckCircle } from 'lucide-react';
import { ShopContext } from '../context/ShopContext';
import Button from '../components/Button';
import './Cart.css';

const Cart = () => {
    const { cart, removeFromCart, updateQuantity, cartTotal } = useContext(ShopContext);
    const [isCheckingOut, setIsCheckingOut] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const formatPrice = (price) => {
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR',
            maximumFractionDigits: 0
        }).format(price);
    };

    const handleCheckout = (e) => {
        e.preventDefault();
        // Simulate API call
        setTimeout(() => {
            setIsSuccess(true);
            // In a real app, clear cart here
        }, 1500);
    };

    if (isSuccess) {
        return (
            <div className="container cart-page success-view">
                <CheckCircle size={64} color="var(--color-accent-green)" />
                <h1>Order Confirmed!</h1>
                <p>Thank you for your purchase. Your tyres are on the way.</p>
                <Button variant="primary" onClick={() => window.location.href = '/'}>Back to Home</Button>
            </div>
        );
    }

    if (cart.length === 0) {
        return (
            <div className="container cart-page empty-view">
                <h1>Your Cart is Empty</h1>
                <p>Looks like you haven't added any tyres yet.</p>
                <Button variant="primary" onClick={() => window.location.href = '/shop'}>Start Shopping</Button>
            </div>
        );
    }

    return (
        <div className="container cart-page">
            <h1>Your Cart ({cart.length} items)</h1>

            <div className="cart-layout">
                <div className="cart-items">
                    {cart.map(item => (
                        <div key={item.id} className="cart-item">
                            <img src={item.image} alt={item.name} className="cart-item-image" />

                            <div className="cart-item-details">
                                <h3>{item.brand} {item.name}</h3>
                                <p className="cart-item-size">{item.size}</p>
                                <div className="cart-item-price">{formatPrice(item.price)}</div>
                            </div>

                            <div className="cart-item-actions">
                                <div className="quantity-controls">
                                    <button onClick={() => updateQuantity(item.id, -1)}><Minus size={16} /></button>
                                    <span>{item.quantity}</span>
                                    <button onClick={() => updateQuantity(item.id, 1)}><Plus size={16} /></button>
                                </div>
                                <button className="remove-btn" onClick={() => removeFromCart(item.id)}>
                                    <Trash2 size={18} />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="cart-summary">
                    <h2>Order Summary</h2>
                    <div className="summary-row">
                        <span>Subtotal</span>
                        <span>{formatPrice(cartTotal)}</span>
                    </div>
                    <div className="summary-row">
                        <span>Shipping</span>
                        <span>Free</span>
                    </div>
                    <div className="summary-row total">
                        <span>Total</span>
                        <span>{formatPrice(cartTotal)}</span>
                    </div>

                    {!isCheckingOut ? (
                        <Button variant="primary" size="lg" className="checkout-btn" onClick={() => setIsCheckingOut(true)}>
                            Proceed to Checkout <ArrowRight size={20} />
                        </Button>
                    ) : (
                        <form className="checkout-form" onSubmit={handleCheckout}>
                            <h3>Shipping Details</h3>
                            <input type="text" placeholder="Full Name" required />
                            <input type="email" placeholder="Email Address" required />
                            <input type="text" placeholder="Address" required />
                            <div className="form-row">
                                <input type="text" placeholder="City" required />
                                <input type="text" placeholder="Zip Code" required />
                            </div>
                            <Button variant="primary" size="lg" className="checkout-btn" type="submit">
                                Confirm Order
                            </Button>
                        </form>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Cart;
