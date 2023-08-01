// controllers/categoriesController.ts
import { Request, Response } from 'express';
import {getAllCategoriesFromService} from '../services/categories.service'
import * as categoryService from '../services/categories.service';

export const getAllCategories = async (req: Request, res: Response) => {
  try {
    const page = parseInt(req.query.page as string, 10) || 1;
    const pageSize = parseInt(req.query.pageSize as string, 10) || 10; // You can set the default page size here

    const categories = await getAllCategoriesFromService(page, pageSize);
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ message: 'Failed to get categories' });
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

