import React from 'react';
import { Facebook, Instagram, Twitter } from 'lucide-react';
import './Footer.css';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="container footer-content">
                <div className="footer-section">
                    <h3>SNR Tyres</h3>
                    <p>Premium tyres and wheels for performance vehicles.</p>
                </div>
                <div className="footer-section">
                    <h4>Contact</h4>
                    <p>Email: support@snrtyres.com</p>
                    <p>Phone: +1 234 567 890</p>
                </div>
                <div className="footer-section">
                    <h4>Follow Us</h4>
                    <div className="social-links">
                        <a href="#"><Facebook size={20} /></a>
                        <a href="#"><Instagram size={20} /></a>
                        <a href="#"><Twitter size={20} /></a>
                    </div>
                </div>
            </div>
            <div className="footer-bottom">
                <p>&copy; 2026 SNR Tyres. All rights reserved.</p>
            </div>
        </footer>
    );
};

export default Footer;
