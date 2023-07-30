// services/categoryService.ts
import Category from '../models/category.model';

export const getAllCategories = async () => {
  try {
    return await Category.findAll();
  } catch (error) {
    throw new Error('Error retrieving categories');
  }
};

export const createNewCategory = async (categoryData: any) => {
  try {
    return await Category.create({
      ...categoryData,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  } catch (error) {
    throw new Error('Error creating category');
  }
};
