import Category from '../models/category.model';

// categoryService.ts
 const getAllCategoriesFromService = async (page: number, pageSize: number) => {
  try {
    // Calculate the offset based on the page number and page size
    const offset = (page - 1) * pageSize;

    // Implementation for getting all categories with pagination
    return await Category.findAll({
      offset,
      limit: pageSize,
    });
  } catch (error) {
    throw new Error('Error retrieving categories');
  }
};



 const createNewCategory = async (categoryData: any) => {
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

export{getAllCategoriesFromService,createNewCategory};