import React, { useState, useRef, useEffect } from 'react';
import './MultiSelect.css';

const MultiSelect = ({ label, options, value = [], onChange, required }) => {
    const [isOpen, setIsOpen] = useState(false);
    const containerRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (containerRef.current && !containerRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const toggleOption = (option) => {
        const newValue = value.includes(option)
            ? value.filter(item => item !== option)
            : [...value, option];
        onChange(newValue);
    };

    const removeOption = (e, option) => {
        e.stopPropagation();
        onChange(value.filter(item => item !== option));
    };

    return (
        <div className="multi-select-container" ref={containerRef}>
            <label className="select-label">{label}{required && <span className="required">*</span>}</label>
            <div 
                className={`multi-select-header ${isOpen ? 'active' : ''}`}
                onClick={() => setIsOpen(!isOpen)}
            >
                <div className="selected-tags">
                    {value.length > 0 ? (
                        value.map(val => (
                            <span key={val} className="tag">
                                {val}
                                <button type="button" onClick={(e) => removeOption(e, val)} className="remove-tag">×</button>
                            </span>
                        ))
                    ) : (
                        <span className="placeholder">Select Models...</span>
                    )}
                </div>
                <div className={`dropdown-icon ${isOpen ? 'open' : ''}`}>▼</div>
            </div>
            {isOpen && (
                <div className="multi-select-dropdown">
                    {options.map(option => (
                        <div 
                            key={option} 
                            className={`option ${value.includes(option) ? 'selected' : ''}`}
                            onClick={() => toggleOption(option)}
                        >
                            <span className="checkbox">{value.includes(option) && '✓'}</span>
                            {option}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default MultiSelect;
