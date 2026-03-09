import Product from '../models/Product.js';

// @desc    Fetch all products
// @route   GET /api/products
// @access  Public
export const getProducts = async (req, res) => {
    try {
        const products = await Product.find({});
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Fetch single product
// @route   GET /api/products/:id
// @access  Public
export const getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (product) {
            res.json(product);
        } else {
            res.status(404).json({ message: 'Product not found' });
        }
    } catch (error) {
        if (error.kind === 'ObjectId') {
            res.status(404).json({ message: 'Product not found' });
        } else {
            res.status(500).json({ message: error.message });
        }
    }
};

// @desc    Create a new product
// @route   POST /api/products
// @access  Private/Admin
export const createProduct = async (req, res) => {
    try {
        const { name, brand, category, price, description, image, stock, vehicleType, specifications, suitableModels, roadType } = req.body;
        const product = await Product.create({ name, brand, category, price, description, image, stock, vehicleType, specifications, suitableModels, roadType });
        res.status(201).json(product);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Update a product
// @route   PUT /api/products/:id
// @access  Private/Admin
export const updateProduct = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) return res.status(404).json({ message: 'Product not found' });

        const { name, brand, category, price, description, image, stock, vehicleType, specifications, suitableModels, roadType } = req.body;
        product.name = name ?? product.name;
        product.brand = brand ?? product.brand;
        product.category = category ?? product.category;
        product.price = price ?? product.price;
        product.description = description ?? product.description;
        product.image = image ?? product.image;
        product.stock = stock ?? product.stock;
        product.vehicleType = vehicleType ?? product.vehicleType;
        product.specifications = specifications ?? product.specifications;
        product.suitableModels = suitableModels ?? product.suitableModels;
        product.roadType = roadType ?? product.roadType;

        const updated = await product.save();
        res.json(updated);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Delete a product
// @route   DELETE /api/products/:id
// @access  Private/Admin
export const deleteProduct = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) return res.status(404).json({ message: 'Product not found' });
        await product.deleteOne();
        res.json({ message: 'Product removed' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
