import React, { useContext } from 'react';
import { ShoppingCart, Star } from 'lucide-react';
import { ShopContext } from '../context/ShopContext';
import Button from './Button';
import Badge from './Badge';
import './TyreCard.css';

const TyreCard = ({ tyre }) => {
    const { addToCart } = useContext(ShopContext);

    const formatPrice = (price) => {
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR',
            maximumFractionDigits: 0
        }).format(price);
    };

    return (
        <div className="tyre-card">
            <div className="tyre-image-container">
                <img src={tyre.image} alt={tyre.name} className="tyre-image" />
                <div className="tyre-badge-container">
                    <Badge variant="default" className="tyre-badge-custom">{tyre.type}</Badge>
                </div>
            </div>

            <div className="tyre-content">
                <div className="tyre-header">
                    <span className="tyre-brand">{tyre.brand}</span>
                    <div className="tyre-rating">
                        <Star size={14} fill="#ffb400" stroke="none" />
                        <span>{tyre.rating}</span>
                    </div>
                </div>

                <h3 className="tyre-name">{tyre.name}</h3>
                <p className="tyre-size">Size: {tyre.size}</p>

                <div className="tyre-footer">
                    <div className="tyre-price">{formatPrice(tyre.price)}</div>
                    <Button
                        variant="primary"
                        size="sm"
                        className="add-btn"
                        onClick={() => addToCart(tyre)}
                    >
                        <ShoppingCart size={16} />
                        Add
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default TyreCard;
