import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../utils/database/database';
import Bidding from './bidding.model';
import Category from './category.model';
import User from './user.model';

interface ProductAttributes {
  id: number;
  product_name: string;
  description: string;
  images: Buffer[]; // Use Buffer[] to represent multiple images as Blobs
  address: string;
  user_id: number;
  sold : boolean;
  buyer_id : number;
  base_price : number;
}

export interface ProductCreationAttributes extends Optional<ProductAttributes, 'id'> {}

class Product extends Model<ProductAttributes, ProductCreationAttributes> implements ProductAttributes {
  address: string;
  public id!: number;
  public product_name!: string;
  public description!: string;
  public images!: Buffer[];
  public user_id!: number; 
  public sold!: boolean; 
  public buyer_id!: number | null; 
  public base_price !: number;
  public readonly bidding?: Bidding[];
  public readonly category?: Category;
  public readonly user?: User;
}

Product.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    product_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    images: {
      type: DataTypes.BLOB('long'), // Use DataTypes.BLOB to store images as Blobs
      allowNull: true,
    },
    address: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    sold: {
      type: DataTypes.BOOLEAN,
      defaultValue: false, // Set the default value to false
    },
    buyer_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    base_price:{
      type: DataTypes.INTEGER,
      allowNull : false
    }
    // Define other attributes and their data types here
  },
  {
    sequelize,
    tableName: 'product',
  }
);

Product.belongsTo(Category, { foreignKey: 'category_id' });
Product.belongsTo(User, { foreignKey: 'user_id' });

export { Product, ProductAttributes };
