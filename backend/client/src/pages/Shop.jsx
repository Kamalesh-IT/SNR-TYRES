import React, { useContext, useState, useEffect } from 'react';
import { ShopContext } from '../context/ShopContext';
import TyreCard from '../components/TyreCard';
import FilterSidebar from '../components/FilterSidebar';
import './Shop.css';

const Shop = () => {
    const { products } = useContext(ShopContext);
    const [filteredProducts, setFilteredProducts] = useState(products);
    const [filters, setFilters] = useState({
        brands: [],
        types: []
    });

    useEffect(() => {
        let result = products;

        if (filters.brands.length > 0) {
            result = result.filter(p => filters.brands.includes(p.brand));
        }

        if (filters.types.length > 0) {
            result = result.filter(p => filters.types.includes(p.type));
        }

        setFilteredProducts(result);
    }, [filters, products]);

    return (
        <div className="shop-page container">
            <div className="shop-header">
                <h1>All Products</h1>
                <p>Showing {filteredProducts.length} results</p>
            </div>

            <div className="shop-layout">
                <div className="shop-sidebar">
                    <FilterSidebar filters={filters} setFilters={setFilters} />
                </div>

                <div className="shop-grid">
                    {filteredProducts.length > 0 ? (
                        filteredProducts.map(tyre => (
                            <TyreCard key={tyre.id} tyre={tyre} />
                        ))
                    ) : (
                        <div className="no-results">
                            <p>No tyres found matching your criteria.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Shop;
