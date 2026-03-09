import express from 'express';
import { getShopDetails, updateShopDetails } from '../controllers/shopController.js';

const router = express.Router();

router.get('/', getShopDetails);
router.post('/', updateShopDetails);

export default router;
