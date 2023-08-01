// src/controllers/productController.ts
import { Request, Response } from 'express';
import ProductService from '../services/product.service';

const productService = new ProductService();

class ProductController {

  // Implementation for adding a product (same as before)
  async addProduct(req: Request, res: Response) {
    try {
      const productData = req.body; 
      const product = await productService.addProduct(productData);
      res.status(201).json(product);
    } catch (error) {
      res.status(500).json({ message: 'Failed to add product' });
    }
  }
  
  async deleteProduct(req: Request, res: Response) {
    try {
      const productId = parseInt(req.params.id, 10);
      const deletedRows = await productService.deleteProduct(productId);

      if (deletedRows === 0) {
        return res.status(404).json({ message: 'Product not found' });
      }

      res.status(200).json({ message: 'Product deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Failed to delete product' });
    }
  }

  // Implementation for updating a product (same as before)
  async updateProduct(req: Request, res: Response) {
    try {
      const productId = parseInt(req.params.id, 10);
      const productData = req.body; 

      const updatedProduct = await productService.updateProduct(productId, productData);

      if (!updatedProduct) {
        return res.status(404).json({ message: 'Product not found' });
      }

      res.status(200).json(updatedProduct);
    } catch (error) {
      res.status(500).json({ message: 'Failed to update product' });
    }
}

getProducts = async (req: Request, res: Response) => {
    const pageNumber = parseInt(req.query.pageNumber as string) || 1;
    const pageSize = parseInt(req.query.pageSize as string) || 10;
  
    try {
      const products = await productService.getProducts(pageNumber, pageSize);
      return res.status(200).json(products);
    } catch (error) {
      console.error('Error fetching products:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  };
}

export default ProductController;
