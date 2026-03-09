import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    brand: {
        type: String,
        required: true,
    },
    category: {
        type: [String],
        default: ['All-Season'],
        enum: ['Summer', 'Winter', 'All-Season', 'Other'],
    },
    roadType: {
        type: [String],
        default: ['City'],
        enum: ['Highway', 'Off-Road', 'City', 'Racing', 'Other'],
    },
    price: {
        type: Number,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    stock: {
        type: Number,
        required: true,
        default: 0,
    },
    vehicleType: {
        type: String,
        required: true,
        enum: ['Car', 'SUV', 'Bike', 'Truck', 'Other'],
        default: 'Car',
    },
    specifications: {
        type: String,
        required: false,
    },
    suitableModels: {
        type: [String],
        default: [],
    },
}, {
    timestamps: true,
});

const Product = mongoose.model('Product', productSchema);
export default Product;
