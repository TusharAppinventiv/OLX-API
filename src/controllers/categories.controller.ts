// controllers/categoriesController.ts
import { Request, Response } from 'express';
import * as categoryService from '../services/categories.service';

export const getCategories = async (req: Request, res: Response) => {
  try {
    const categories = await categoryService.getAllCategories();
    return res.status(200).json(categories);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

export const createCategory = async (req: Request, res: Response) => {
  try {
    const { category_name, subcategories, image } = req.body;
    const categoryData = { category_name, subcategories, image };
    const category = await categoryService.createNewCategory(categoryData);
    return res.status(201).json(category);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};
