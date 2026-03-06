import { createContext, useState, useEffect } from 'react';
import { tyres } from '../data/tyres';

export const ShopContext = createContext(null);

export const ShopProvider = ({ children }) => {
    const [products, setProducts] = useState(tyres);
    const [cart, setCart] = useState([]);
    const [isAdmin, setIsAdmin] = useState(false);

    // Cart Functions
    const addToCart = (product) => {
        setCart((prev) => {
            const existing = prev.find((item) => item.id === product.id);
            if (existing) {
                return prev.map((item) =>
                    item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
                );
            }
            return [...prev, { ...product, quantity: 1 }];
        });
    };

    const removeFromCart = (productId) => {
        setCart((prev) => prev.filter((item) => item.id !== productId));
    };

    const updateQuantity = (productId, amount) => {
        setCart((prev) =>
            prev.map(item => {
                if (item.id === productId) {
                    return { ...item, quantity: Math.max(0, item.quantity + amount) };
                }
                return item;
            }).filter(item => item.quantity > 0)
        );
    };

    const cartTotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

    // Admin Functions
    const updateProduct = (updatedProduct) => {
        setProducts(prev => prev.map(p => p.id === updatedProduct.id ? updatedProduct : p));
    };

    const addProduct = (newProduct) => {
        setProducts(prev => [...prev, { ...newProduct, id: Date.now() }]);
    };

    const deleteProduct = (id) => {
        setProducts(prev => prev.filter(p => p.id !== id));
    };

    const value = {
        products,
        cart,
        isAdmin,
        setIsAdmin,
        addToCart,
        removeFromCart,
        updateQuantity,
        cartTotal,
        updateProduct,
        addProduct,
        deleteProduct
    };

    return (
        <ShopContext.Provider value={value}>
            {children}
        </ShopContext.Provider>
    );
};
