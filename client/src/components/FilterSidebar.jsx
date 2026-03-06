import React from 'react';
import { brands, types } from '../data/tyres';
import './FilterSidebar.css';

const FilterSidebar = ({ filters, setFilters }) => {

    const handleBrandChange = (brand) => {
        setFilters(prev => {
            if (prev.brands.includes(brand)) {
                return { ...prev, brands: prev.brands.filter(b => b !== brand) };
            }
            return { ...prev, brands: [...prev.brands, brand] };
        });
    };

    const handleTypeChange = (type) => {
        setFilters(prev => {
            if (prev.types.includes(type)) {
                return { ...prev, types: prev.types.filter(t => t !== type) };
            }
            return { ...prev, types: [...prev.types, type] };
        });
    };

    return (
        <aside className="filter-sidebar">
            <div className="filter-group">
                <h3>Brands</h3>
                {brands.map(brand => (
                    <label key={brand} className="checkbox-label">
                        <input
                            type="checkbox"
                            checked={filters.brands.includes(brand)}
                            onChange={() => handleBrandChange(brand)}
                        />
                        <span className="checkmark"></span>
                        {brand}
                    </label>
                ))}
            </div>

            <div className="filter-group">
                <h3>Tyre Type</h3>
                {types.map(type => (
                    <label key={type} className="checkbox-label">
                        <input
                            type="checkbox"
                            checked={filters.types.includes(type)}
                            onChange={() => handleTypeChange(type)}
                        />
                        <span className="checkmark"></span>
                        {type}
                    </label>
                ))}
            </div>
        </aside>
    );
};

export default FilterSidebar;
