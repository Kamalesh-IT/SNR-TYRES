import { Link } from 'react-router-dom'

export default function Footer() {
    return (
        <footer style={{ background: 'black', borderTop: '1px solid var(--border)', padding: '4rem 0 2rem', color: 'var(--text-light)' }}>
            <div className="container">

                {/* Trusted By */}
                <div className="mb-12 text-center">
                    <p className="uppercase text-muted" style={{ fontSize: '0.875rem', letterSpacing: '0.1em', marginBottom: '2rem' }}>Trusted By Professionals</p>
                    <div className="flex justify-center gap-12 flex-wrap" style={{ opacity: 0.5, filter: 'grayscale(100%)' }}>
                        {/* Logo text placeholders */}
                        <span style={{ fontSize: '1.5rem', fontWeight: 700 }}>BADYEAR</span>
                        <span style={{ fontSize: '1.5rem', fontWeight: 700 }}>MICHELANGELO</span>
                        <span style={{ fontSize: '1.5rem', fontWeight: 700 }}>BRIDGEROCK</span>
                        <span style={{ fontSize: '1.5rem', fontWeight: 700 }}>CONTINENTAL</span>
                    </div>
                </div>

                <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', paddingBottom: '3rem', borderBottom: '1px solid var(--border)' }}>
                    <div>
                        <h3 style={{ color: 'white', marginBottom: '1.5rem' }}>SNR Tyres</h3>
                        <p>Premium wheels and tyres for the modern driver. Quality, safety, and performance.</p>
                    </div>
                    <div>
                        <h4 style={{ color: 'white' }}>Shop</h4>
                        <ul style={{ listStyle: 'none', padding: 0, display: 'grid', gap: '0.5rem' }}>
                            <li><Link to="/tyres">All Tyres</Link></li>
                            <li><Link to="/tyres">Alloy Wheels</Link></li>
                            <li><Link to="/tyres">Accessories</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h4 style={{ color: 'white' }}>Company</h4>
                        <ul style={{ listStyle: 'none', padding: 0, display: 'grid', gap: '0.5rem' }}>
                            <li><Link to="/about">About Us</Link></li>
                            <li><Link to="/contact">Contact</Link></li>
                            <li><Link to="/terms">Terms & Conditions</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h4 style={{ color: 'white' }}>Newsletter</h4>
                        <p className="text-sm">Subscribe to get the latest drops and offers.</p>
                        <div className="flex gap-2">
                            <input type="email" placeholder="Enter your email" style={{ background: '#222', borderColor: '#333' }} />
                            <button className="btn btn-primary" style={{ padding: '0.5rem 1rem' }}>→</button>
                        </div>
                    </div>
                </div>

                <div className="text-center mt-4 pt-4" style={{ fontSize: '0.875rem' }}>
                    &copy; {new Date().getFullYear()} SNR Tyres. All rights reserved.
                </div>
            </div>
        </footer>
    )
}
