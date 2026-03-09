import Shop from '../models/Shop.js';

export const getShopDetails = async (req, res) => {
    try {
        let shop = await Shop.findOne();
        if (!shop) {
            shop = await Shop.create({ name: 'SNR Tyres' });
        }
        res.json(shop);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching shop details', error: error.message });
    }
};

export const updateShopDetails = async (req, res) => {
    try {
        const { name, address, contactNumber, email, openingHours, logo } = req.body;
        let shop = await Shop.findOne();
        
        if (shop) {
            shop.name = name ?? shop.name;
            shop.address = address ?? shop.address;
            shop.contactNumber = contactNumber ?? shop.contactNumber;
            shop.email = email ?? shop.email;
            shop.openingHours = openingHours ?? shop.openingHours;
            shop.logo = logo ?? shop.logo;
            await shop.save();
        } else {
            shop = await Shop.create(req.body);
        }
        
        res.json(shop);
    } catch (error) {
        res.status(500).json({ message: 'Error updating shop details', error: error.message });
    }
};
