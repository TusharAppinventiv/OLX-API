// routes/categoriesRoutes.ts
import express from 'express';
import * as categoriesController from '../controllers/categories.controller';

const router = express.Router();

// GET all categories
router.get('/categories', categoriesController.getCategories);

// POST create a new category
router.post('/categories', categoriesController.createCategory);

export default router;
