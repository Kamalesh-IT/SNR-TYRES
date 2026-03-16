import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Product from './models/Product.js';

dotenv.config();

const jkTyres = [
    // Car Tyres
    {
        name: 'UX Royale 205/60 R16',
        brand: 'JK Tyre',
        category: ['Summer'],
        roadType: ['Highway', 'City'],
        price: 6250,
        description: 'Low noise, high-speed stability and comfort for premium sedans.',
        image: 'https://images.unsplash.com/photo-1549410284-85bc10e20fb1?auto=format&fit=crop&q=80&w=600',
        stock: 45,
        rating: 4.8,
        vehicleType: 'Car',
        specifications: '205/60 R16, Speed Rating V, Load Index 92',
        suitableModels: ['Honda City', 'Hyundai Verna']
    },
    {
        name: 'Ultima NXT 155/70 R13',
        brand: 'JK Tyre',
        category: ['All-Season'],
        roadType: ['City'],
        price: 3150,
        description: 'Better mileage and strong grip for entry-level hatchbacks.',
        image: 'https://images.unsplash.com/photo-1541819665-de3969185a97?auto=format&fit=crop&q=80&w=600',
        stock: 60,
        rating: 4.5,
        vehicleType: 'Car',
        specifications: '155/70 R13, Speed Rating S, Load Index 75',
        suitableModels: ['Hyundai Santro', 'Hyundai Eon']
    },
    {
        name: 'Ultima Hi Life 155/80 R13',
        brand: 'JK Tyre',
        category: ['All-Season'],
        roadType: ['City'],
        price: 3450,
        description: 'Long tread life and comfortable ride for popular family cars.',
        image: 'https://images.unsplash.com/photo-1549410313-2d2c2d2c2d2c?auto=format&fit=crop&q=80&w=600',
        stock: 55,
        rating: 4.6,
        vehicleType: 'Car',
        specifications: '155/80 R13, Speed Rating S, Load Index 79',
        suitableModels: ['Maruti Wagon R', 'Tata Tiago']
    },
    {
        name: 'Levitas Ultra 195/55 R16',
        brand: 'JK Tyre',
        category: ['Summer'],
        roadType: ['Highway'],
        price: 7150,
        description: 'Premium comfort and high grip for premium hatchbacks and sedans.',
        image: 'https://images.unsplash.com/photo-1542044896530-05d85be9b11a?auto=format&fit=crop&q=80&w=600',
        stock: 35,
        rating: 4.9,
        vehicleType: 'Car',
        specifications: '195/55 R16, Speed Rating V, Load Index 87',
        suitableModels: ['Hyundai i20', 'Honda Jazz']
    },
    // SUV Tyres
    {
        name: 'UX Touring 205/65 R16',
        brand: 'JK Tyre',
        category: ['All-Season'],
        roadType: ['Highway', 'City'],
        price: 5950,
        description: 'Smooth ride and long tread life specifically designed for SUVs and MUVs.',
        image: 'https://images.unsplash.com/photo-1542013936663-e7998b536ad4?auto=format&fit=crop&q=80&w=600',
        stock: 40,
        rating: 4.7,
        vehicleType: 'SUV',
        specifications: '205/65 R16, Speed Rating H, Load Index 95',
        suitableModels: ['Hyundai Creta', 'Kia Seltos']
    },
    {
        name: 'Ranger H/T 235/65 R17',
        brand: 'JK Tyre',
        category: ['All-Season'],
        roadType: ['Highway'],
        price: 9250,
        description: 'Highway terrain specialist with low noise and high-speed stability.',
        image: 'https://images.unsplash.com/photo-1580193259160-b99d79a25b2a?auto=format&fit=crop&q=80&w=600',
        stock: 25,
        rating: 4.8,
        vehicleType: 'SUV',
        specifications: '235/65 R17, Speed Rating H, Load Index 104',
        suitableModels: ['Toyota Fortuner']
    },
    {
        name: 'Ranger A/T 265/65 R17',
        brand: 'JK Tyre',
        category: ['All-Season'],
        roadType: ['Off-Road', 'Highway'],
        price: 10250,
        description: 'All-terrain grip for superior performance on both roads and tracks.',
        image: 'https://images.unsplash.com/photo-1594731802111-070125255077?auto=format&fit=crop&q=80&w=600',
        stock: 20,
        rating: 4.6,
        vehicleType: 'SUV',
        specifications: '265/65 R17, Speed Rating T, Load Index 112',
        suitableModels: ['Mahindra Thar']
    },
    {
        name: 'Ranger M/T 245/75 R16',
        brand: 'JK Tyre',
        category: ['All-Season'],
        roadType: ['Off-Road'],
        price: 10950,
        description: 'Mud terrain specialist with exceptional off-road traction and stone ejector.',
        image: 'https://images.unsplash.com/photo-1549410313-e020d20d2d2d?auto=format&fit=crop&q=80&w=600',
        stock: 15,
        rating: 4.9,
        vehicleType: 'SUV',
        specifications: '245/75 R16, Speed Rating Q, Load Index 120',
        suitableModels: ['Jeep Wrangler']
    },
    // Bike Tyres
    {
        name: 'Blaze BF32 90/90-17',
        brand: 'JK Tyre',
        category: ['Summer'],
        roadType: ['City'],
        price: 1850,
        description: 'Strong grip and durability for everyday city commuting.',
        image: 'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&q=80&w=600',
        stock: 80,
        rating: 4.5,
        vehicleType: 'Bike',
        specifications: '90/90-17, Tubeless, Load Index 49',
        suitableModels: ['Bajaj Pulsar']
    },
    {
        name: 'Blaze BR41 100/90-18',
        brand: 'JK Tyre',
        category: ['Summer'],
        roadType: ['Highway'],
        price: 2150,
        description: 'High stability and superior control for long-distance highway cruises.',
        image: 'https://images.unsplash.com/photo-1591637333184-1d07b719702a?auto=format&fit=crop&q=80&w=600',
        stock: 70,
        rating: 4.7,
        vehicleType: 'Bike',
        specifications: '100/90-18, Tubeless, Load Index 56',
        suitableModels: ['Royal Enfield']
    },
    {
        name: 'Jet X 80/100-18',
        brand: 'JK Tyre',
        category: ['Summer'],
        roadType: ['City'],
        price: 1450,
        description: 'Long life and dependable performance for commuters.',
        image: 'https://images.unsplash.com/photo-1591637333184-1d07b719702a?auto=format&fit=crop&q=80&w=600',
        stock: 100,
        rating: 4.4,
        vehicleType: 'Bike',
        specifications: '80/100-18, Tube Type, Load Index 47',
        suitableModels: ['Hero Splendor']
    },
    // Truck Tyres
    {
        name: 'Jet Steel JDH XM 295/90 R20',
        brand: 'JK Tyre',
        category: ['All-Season'],
        roadType: ['Highway'],
        price: 25500,
        description: 'Heavy load capacity and durability for long-haul transport trucks.',
        image: 'https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?auto=format&fit=crop&q=80&w=600',
        stock: 15,
        rating: 4.8,
        vehicleType: 'Truck',
        specifications: '295/90 R20, Radial, Ply Rating 16 PR',
        suitableModels: ['Long Haul Trucks']
    },
    {
        name: 'Jetway JUC XM 10.00 R20',
        brand: 'JK Tyre',
        category: ['All-Season'],
        roadType: ['Highway', 'City'],
        price: 22500,
        description: 'High durability and excellent retreadability for cargo trucks.',
        image: 'https://images.unsplash.com/photo-1549410313-3d3d3d3d3d3d?auto=format&fit=crop&q=80&w=600',
        stock: 20,
        rating: 4.7,
        vehicleType: 'Truck',
        specifications: '10.00 R20, Radial, Ply Rating 16 PR',
        suitableModels: ['Cargo Trucks']
    },
    {
        name: 'Jet Steel JDM 11.00 R20',
        brand: 'JK Tyre',
        category: ['All-Season'],
        roadType: ['Highway'],
        price: 27500,
        description: 'Better mileage and optimized tread design for highway transport.',
        image: 'https://images.unsplash.com/photo-1549410313-4d4d4d4d4d4d?auto=format&fit=crop&q=80&w=600',
        stock: 12,
        rating: 4.9,
        vehicleType: 'Truck',
        specifications: '11.00 R20, Radial, Ply Rating 18 PR',
        suitableModels: ['Highway Transport']
    }
];

const seedJKTyres = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Connected to MongoDB');

        // Clean slate for migration
        await Product.deleteMany({});
        console.log('Existing products cleared');

        await Product.insertMany(jkTyres);
        console.log('JK Tyres seeded successfully with all details!');

        process.exit();
    } catch (error) {
        console.error('Error seeding data: ', error);
        process.exit(1);
    }
};

seedJKTyres();
