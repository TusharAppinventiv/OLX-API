// src/routes/productRoutes.ts
import { Router } from 'express';
import ProductController from '../controllers/product.controller';

const router = Router();
const productController = new ProductController();

router.post('/add', productController.addProduct);
router.delete('/delete/:id', productController.deleteProduct);
router.put('/update/:id', productController.updateProduct);
router.get('/:id', productController.getProduct); // Use GET request for getting product details

export default router;
