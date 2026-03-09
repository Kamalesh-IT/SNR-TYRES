import mongoose from 'mongoose';

const shopSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        default: 'SNR Tyres'
    },
    address: {
        type: String,
        default: ''
    },
    contactNumber: {
        type: String,
        default: ''
    },
    email: {
        type: String,
        default: ''
    },
    openingHours: {
        type: String,
        default: ''
    },
    logo: {
        type: String,
        default: ''
    }
}, { timestamps: true });

const Shop = mongoose.model('Shop', shopSchema);

export default Shop;
