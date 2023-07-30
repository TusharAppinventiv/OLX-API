import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../utils/database/database';

class Category extends Model {
  public id!: number;
  public category_name!: string;
  public subcategories!: string;
  public createdAt!: Date;
  public updatedAt!: Date;
  public image!: Buffer;
}

Category.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    category_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    subcategories: {
      type: DataTypes.STRING,
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    image: {
      type: DataTypes.BLOB('long'),
    },
  },
  {
    sequelize,
    modelName: 'Category',
    tableName: 'categories',
  }
);

export default Category;
