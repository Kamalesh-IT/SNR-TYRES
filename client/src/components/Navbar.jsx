import React, { useContext, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingCart, Menu, X, ShieldCheck, User, LogOut, Package, UserCircle } from 'lucide-react';
import { ShopContext } from '../context/ShopContext';
import { useAuth } from '../context/AuthContext';
import Button from './Button';
import './Navbar.css';

const Navbar = () => {
    const { cart } = useContext(ShopContext);
    const { user, logout } = useAuth();
    const [isMobileOpen, setIsMobileOpen] = useState(false);
    const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
    const location = useLocation();

    const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);

    const isActive = (path) => {
        return location.pathname === path ? 'active' : '';
    };

    return (
        <nav className="navbar">
            <div className="container navbar-content">
                <Link to="/" className="logo">
                    <span className="logo-accent">SNR</span> Tyres
                </Link>

                {/* Desktop Menu */}
                <div className="nav-links desktop-only">
                    <Link to="/" className={`nav-link ${isActive('/')}`}>Home</Link>
                    <Link to="/shop" className={`nav-link ${isActive('/shop')}`}>Shop</Link>
                    {!user && <Link to="/login" className={`nav-link ${isActive('/login')}`}>Log In</Link>}
                    <Link to="/admin" className={`nav-link ${isActive('/admin')}`}>
                        <ShieldCheck size={16} style={{ marginRight: '4px' }} /> Admin
                    </Link>
                </div>

                <div className="nav-actions">
                    {user ? (
                        <div className="user-menu-container desktop-only">
                            <button 
                                className="user-menu-trigger" 
                                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                            >
                                <UserCircle size={28} color="var(--color-accent-blue)" />
                                <span className="user-name-label">{user.name.split(' ')[0]}</span>
                            </button>
                            
                            {isUserMenuOpen && (
                                <div className="user-dropdown">
                                    <Link to="/profile" onClick={() => setIsUserMenuOpen(false)}>
                                        <User size={16} /> Profile
                                    </Link>
                                    <Link to="/orders" onClick={() => setIsUserMenuOpen(false)}>
                                        <Package size={16} /> My Orders
                                    </Link>
                                    <hr />
                                    <button onClick={() => { logout(); setIsUserMenuOpen(false); }}>
                                        <LogOut size={16} /> Logout
                                    </button>
                                </div>
                            )}
                        </div>
                    ) : (
                        <Link to="/login" className="desktop-only" style={{ marginRight: '0.5rem' }}>
                            <Button variant="ghost" size="sm">Log In</Button>
                        </Link>
                    )}
                    
                    <Link to="/cart">
                        <Button variant="outline" className="cart-btn" size="sm">
                            <ShoppingCart size={18} />
                            {totalItems > 0 && <span className="cart-badge">{totalItems}</span>}
                        </Button>
                    </Link>

                    <button className="mobile-toggle mobile-only" onClick={() => setIsMobileOpen(!isMobileOpen)}>
                        {isMobileOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            {isMobileOpen && (
                <div className="mobile-menu">
                    <Link to="/" className="mobile-link" onClick={() => setIsMobileOpen(false)}>Home</Link>
                    <Link to="/shop" className="mobile-link" onClick={() => setIsMobileOpen(false)}>Shop</Link>
                    {user ? (
                        <>
                            <Link to="/profile" className="mobile-link" onClick={() => setIsMobileOpen(false)}>Profile</Link>
                            <Link to="/orders" className="mobile-link" onClick={() => setIsMobileOpen(false)}>My Orders</Link>
                            <button className="mobile-link logout-btn" onClick={() => { logout(); setIsMobileOpen(false); }}>Logout</button>
                        </>
                    ) : (
                        <>
                            <Link to="/login" className="mobile-link" onClick={() => setIsMobileOpen(false)}>Log In</Link>
                            <Link to="/register" className="mobile-link" onClick={() => setIsMobileOpen(false)}>Sign Up</Link>
                        </>
                    )}
                    <Link to="/admin" className="mobile-link" onClick={() => setIsMobileOpen(false)}>Admin</Link>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
