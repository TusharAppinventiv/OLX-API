// src/services/productService.ts
import {Product,ProductAttributes} from '../models/products.model';

class ProductService {
  // Implementation for adding a product (same as before)
  async addProduct(productData: Partial<ProductAttributes>): Promise<Product> {
    const product = await Product.create(productData);
    return product;
  }

  // Implementation for deleting a product (same as before)
  async deleteProduct(productId: number): Promise<number> {
    const deletedRows = await Product.destroy({ where: { id: productId } });
    return deletedRows;
  }

  // Implementation for updating a product (same as before)
  async updateProduct(productId: number, productData: Partial<ProductAttributes>): Promise<Product | null> {
    const product = await Product.findByPk(productId);

    if (!product) {
      return null;
    }

    await product.update(productData);
    return product;
  }

  async getProduct(productId: number): Promise<Product | null> {
    // Implementation for getting product details;
    const product = await Product.findByPk(productId);
    return product;
  }
}

export default ProductService;
