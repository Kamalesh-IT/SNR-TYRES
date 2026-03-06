import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Product from './models/Product.js';

dotenv.config();

const mockProducts = [
    {
        name: 'Pilot Sport 4S 245/35 R19',
        brand: 'Michelin',
        category: 'Performance',
        price: 18500,
        description: 'Ultra-high performance summer tyre with exceptional grip and handling on both wet and dry roads.',
        image: '/images/Pilot Sport 4S.jpg',
        stock: 12,
    },
    {
        name: 'P Zero Corsa 285/30 R20',
        brand: 'Pirelli',
        category: 'Performance',
        price: 22000,
        description: 'Top-tier motorsport-inspired tyre designed for maximum lateral grip and precision steering.',
        image: '/images/P Zero.jpg',
        stock: 8,
    },
    {
        name: 'Potenza Sport 225/45 R18',
        brand: 'Bridgestone',
        category: 'Summer',
        price: 14500,
        description: 'High-performance summer tyre offering superior handling, braking, and stability at high speeds.',
        image: '/images/Potenza Sport.jpg',
        stock: 20,
    },
    {
        name: 'Eagle F1 Asymmetric 6 235/40 R18',
        brand: 'Goodyear',
        category: 'Summer',
        price: 13200,
        description: 'Asymmetric performance tyre delivering outstanding wet and dry traction with excellent durability.',
        image: '/images/Eagle F1 Asymmetric.jpg',
        stock: 15,
    },
    {
        name: 'Turanza T005 205/55 R16',
        brand: 'Bridgestone',
        category: 'All-Season',
        price: 8900,
        description: 'Premium touring tyre offering a smooth, quiet ride with confident handling in all weather conditions.',
        image: '/images/Turanza T005.jpg',
        stock: 30,
    },
    {
        name: 'WinterContact TS 870 195/65 R15',
        brand: 'Continental',
        category: 'Winter',
        price: 10500,
        description: 'Advanced winter tyre engineered for safe and confident driving on snow, ice, and cold wet roads.',
        image: '/images/WinterContact TS 870.jpg',
        stock: 18,
    }
];

const seedProducts = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Connected to MongoDB');

        await Product.deleteMany();
        console.log('Existing products deleted');

        await Product.insertMany(mockProducts);
        console.log('Products seeded successfully with local images');

        process.exit();
    } catch (error) {
        console.error('Error seeding data: ', error);
        process.exit(1);
    }
};

seedProducts();
