// models/Bidder.ts
import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../utils/database/database';
import User from './user.model';
import {Product,ProductAttributes} from './products.model';

interface BiddingAttributes {
  id: number;
  user_id: number;
  product_id: number;
  bid_amount: number;
}

class Bidder extends Model<BiddingAttributes> implements BiddingAttributes {
  public id!: number;
  public user_id!: number;
  public product_id!: number;
  public bid_amount!: number;
}

Bidder.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: User, // Reference the User model
        key: 'id',
      },
    },
    product_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Product, 
        key: 'id', 
      },
    },
    bid_amount: {
      type: DataTypes.FLOAT, 
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: 'biddersData',
  }
);

// Define associations between Bidder, User, and Product models
Bidder.belongsTo(User, { foreignKey: 'user_id' });
Bidder.belongsTo(Product, { foreignKey: 'product_id' });

export default Bidder;

