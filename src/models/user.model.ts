// models/userModel.ts
import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../utils/database/database';
import bcrypt from 'bcryptjs';

interface UserAttributes {
  id: number;
  username: string;
  email: string;
  password: string;
  address: string;
  profile_photo: Buffer;
  mobNumber: string;
  gender: string;
  dob: Date;
  firstName: string;
  lastName: string;
  status : Boolean;
  session : Boolean;
}

class UserModel extends Model<UserAttributes> implements UserAttributes {
  static findByUsername(username: any) {
      throw new Error('Method not implemented.');
  }
  public id!: number;
  public username!: string;
  public email!: string;
  public password!: string;
  public address!: string;
  public profile_photo!: Buffer;
  public mobNumber!: string;
  public gender!: string;
  public dob!: Date;
  public firstName!: string;
  public lastName!: string;
  public status !: boolean;
  public session !: boolean;
  static async findByEmail(email: string): Promise<UserModel | null> {
    return UserModel.findOne({ where: { email } });
  }  
  async validatePassword(password: string): Promise<boolean> {
    return bcrypt.compare(password, this.password);
  }

}

UserModel.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    profile_photo: {
      type: DataTypes.BLOB('medium'),
    },
    mobNumber: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    gender: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    dob: {
      type: DataTypes.DATE,
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    status : {
        type : DataTypes.BOOLEAN,
        allowNull : false,
    },
    session : {
        type : DataTypes.BOOLEAN,
        allowNull : false,
    },
  },
  
  {
    sequelize,
    modelName: 'User',
    tableName: 'users', 
  }
);

export default UserModel;
