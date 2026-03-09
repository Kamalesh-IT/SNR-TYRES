import React from 'react';
import './Select.css';

const Select = ({
    label,
    options,
    value,
    onChange,
    id,
    className = '',
    ...props
}) => {
    const selectId = id || Math.random().toString(36).substr(2, 9);

    return (
        <div className={`select-wrapper ${className}`}>
            {label && (
                <label htmlFor={selectId} className="select-label">
                    {label}
                </label>
            )}
            <select
                id={selectId}
                value={value}
                onChange={onChange}
                className="select-field"
                {...props}
            >
                {options.map((opt) => (
                    <option key={opt} value={opt}>
                        {opt}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default Select;
