import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, ArrowRight } from 'lucide-react';
import { ShopContext } from '../context/ShopContext';
import TyreCard from '../components/TyreCard';
import Button from '../components/Button';
import './Home.css';

const Home = () => {
    const { products } = useContext(ShopContext);
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();

    const handleSearch = (e) => {
        e.preventDefault();
        // In a real app, pass search term via URL params
        if (searchTerm.trim()) {
            // Just navigation for now, maybe with state if I impl Search Context later
            navigate('/shop');
        }
    };

    const featuredProducts = Array.isArray(products) ? products.slice(0, 3) : [];

    return (
        <div className="home-page">
            {/* Hero Section */}
            <section className="hero-section">
                <div className="hero-overlay"></div>
                <div className="container hero-content">
                    <h1>Experience the <span className="text-gradient">Unknown</span></h1>
                    <p>Premium tyres for those who demand performance, safety, and control.</p>

                    <form onSubmit={handleSearch} className="hero-search">
                        <input
                            type="text"
                            placeholder="Search by size (e.g., 245/40) or brand..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <Button variant="primary" size="md" type="submit">
                            <Search size={20} /> Search
                        </Button>
                    </form>
                </div>
            </section>

            {/* Featured Section */}
            <section className="featured-section container">
                <div className="section-header">
                    <h2>Featured Tyres</h2>
                    <Button variant="outline" size="sm" onClick={() => navigate('/shop')}>
                        View All <ArrowRight size={16} />
                    </Button>
                </div>

                <div className="product-grid">
                    {featuredProducts.length > 0 ? (
                        featuredProducts.map(tyre => (
                            <TyreCard key={tyre._id || tyre.id} tyre={tyre} />
                        ))
                    ) : (
                        <p>No featured products available.</p>
                    )}
                </div>
            </section>

            {/* Promotion Banner */}
            <section className="promo-banner container">
                <div className="promo-content">
                    <h2>Summer Sale</h2>
                    <p>Get 20% off on all Michelin Tyres this week.</p>
                    <Button variant="secondary" onClick={() => navigate('/shop')}>Shop Now</Button>
                </div>
            </section>
        </div>
    );
};

export default Home;
