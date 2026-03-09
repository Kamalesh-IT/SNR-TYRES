import { createContext, useState, useEffect } from 'react';
import { tyres as staticTyres } from '../data/tyres';

export const ShopContext = createContext(null);

export const ShopProvider = ({ children }) => {
    const [products, setProducts] = useState(staticTyres);
    const [cart, setCart] = useState([]);
    const [isAdmin, setIsAdmin] = useState(false);
    const [loading, setLoading] = useState(true);
    const [shopDetails, setShopDetails] = useState({
        name: 'SNR Tyres',
        address: '',
        contactNumber: '',
        email: '',
        openingHours: '',
        logo: ''
    });

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/products');
                const data = await response.json();
                if (response.ok && Array.isArray(data) && data.length > 0) {
                    setProducts(data);
                }
            } catch (error) {
                console.error("Failed to fetch products", error);
            } finally {
                setLoading(false);
            }
        };

        const fetchShopDetails = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/shop');
                if (response.ok) {
                    const data = await response.json();
                    if (data && typeof data === 'object') {
                        setShopDetails(prev => ({ ...prev, ...data }));
                    }
                }
            } catch (error) {
                console.error("Failed to fetch shop details", error);
            }
        };

        fetchProducts();
        fetchShopDetails();
    }, []);

    // Cart Functions
    const addToCart = (product) => {
        setCart((prev) => {
            const existing = prev.find((item) => item._id === product._id);
            if (existing) {
                return prev.map((item) =>
                    item._id === product._id ? { ...item, quantity: item.quantity + 1 } : item
                );
            }
            return [...prev, { ...product, quantity: 1 }];
        });
    };

    const removeFromCart = (productId) => {
        setCart((prev) => prev.filter((item) => item._id !== productId));
    };

    const updateQuantity = (productId, amount) => {
        setCart((prev) =>
            prev.map(item => {
                if (item._id === productId) {
                    return { ...item, quantity: Math.max(0, item.quantity + amount) };
                }
                return item;
            }).filter(item => item.quantity > 0)
        );
    };

    const cartTotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

    // Admin Functions
    const updateProduct = async (updatedProduct) => {
        try {
            const response = await fetch(`http://localhost:5000/api/products/${updatedProduct._id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(updatedProduct)
            });
            const data = await response.json();
            if (response.ok) {
                setProducts(prev => prev.map(p => p._id === data._id ? data : p));
            } else {
                console.error('Failed to update product:', data.message);
            }
        } catch (error) {
            console.error('Error updating product:', error);
        }
    };

    const addProduct = async (newProduct) => {
        try {
            const response = await fetch('http://localhost:5000/api/products', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newProduct)
            });
            const data = await response.json();
            if (response.ok) {
                setProducts(prev => [...prev, data]);
            } else {
                console.error('Failed to add product:', data.message);
            }
        } catch (error) {
            console.error('Error adding product:', error);
        }
    };

    const deleteProduct = async (id) => {
        try {
            const response = await fetch(`http://localhost:5000/api/products/${id}`, {
                method: 'DELETE',
            });
            if (response.ok) {
                setProducts(prev => prev.filter(p => p._id !== id));
            } else {
                const data = await response.json();
                console.error('Failed to delete product:', data.message);
            }
        } catch (error) {
            console.error('Error deleting product:', error);
        }
    };

    const updateShopInfo = async (newDetails) => {
        try {
            const response = await fetch('http://localhost:5000/api/shop', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newDetails)
            });
            const data = await response.json();
            if (response.ok) {
                setShopDetails(data);
            } else {
                console.error('Failed to update shop details:', data.message);
            }
        } catch (error) {
            console.error('Error updating shop details:', error);
        }
    };

    const value = {
        products,
        loading,
        cart,
        isAdmin,
        shopDetails,
        setIsAdmin,
        addToCart,
        removeFromCart,
        updateQuantity,
        cartTotal,
        updateProduct,
        addProduct,
        deleteProduct,
        updateShopInfo
    };

    return (
        <ShopContext.Provider value={value}>
            {children}
        </ShopContext.Provider>
    );
};
