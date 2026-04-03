import express from 'express';
const router = express.Router();

// Local file import karte waqt .js extension zaroor lagayein
import { getAllProducts } from '../controllers/productController.js'; 

router.get('/products', getAllProducts);

// module.exports ki jagah export default use karein
export default router;